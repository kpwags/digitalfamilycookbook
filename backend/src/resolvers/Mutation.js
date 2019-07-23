const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport } = require('../lib/transport');
const { requestResetPasswordEmail } = require('../lib/emails');

const Mutations = {
  async changePassword(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const updates = { ...args };

    delete updates.id;

    if (args.id !== ctx.request.userId) {
      throw new Error('You can only change your own password');
    }

    const user = await ctx.db.query.user({ where: { id: ctx.request.userId } });
    const valid = await bcrypt.compare(args.currentPassword, user.password);
    if (!valid) {
      throw new Error('Current password is invalid');
    }

    const password = await bcrypt.hash(args.password, 10);

    return ctx.db.mutation.updateUser(
      {
        data: {
          password,
        },
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  async createCategory(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to create a category');
    }

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to create a category');
    }

    const category = ctx.db.mutation.createCategory(
      {
        data: {
          ...args,
        },
      },
      info,
    );

    return category;
  },

  async createInvitationCode(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to create an inivation code');
    }

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to create an invitation code');
    }

    const invitationCode = ctx.db.mutation.createInvitationCode(
      {
        data: {
          ...args,
        },
      },
      info,
    );

    return invitationCode;
  },

  async createMeat(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to create a meat');
    }

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to create a meat');
    }

    const meat = ctx.db.mutation.createMeat(
      {
        data: {
          ...args,
        },
      },
      info,
    );

    return meat;
  },

  async deleteCategory(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const where = { id: args.id };

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to delete');
    }

    return ctx.db.mutation.deleteCategory({ where }, info);
  },

  async deleteInvitationCode(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const where = { id: args.id };

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to delete invitation codes');
    }

    return ctx.db.mutation.deleteInvitationCode({ where }, info);
  },

  async deleteMeat(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const where = { id: args.id };

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to delete');
    }

    return ctx.db.mutation.deleteMeat({ where }, info);
  },

  async login(parent, { email, password }, ctx) {
    let user = await ctx.db.query.user({ where: { email } });

    // check if user exists
    if (!user) {
      user = await ctx.db.query.user({ where: { username: email } });

      if (!user) {
        throw new Error('Invalid username or password');
      }
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    return user;
  },

  logout(parent, args, ctx) {
    ctx.response.clearCookie('token');
    return { message: 'Logged out' };
  },

  async requestPasswordReset(parent, args, ctx) {
    // check if user exists
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }

    // set reset token & expiry
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });

    // email token
    await transport.sendMail({
      from: 'noreply@digitalfamilycookbook.com',
      to: user.email,
      subject: 'Your Password Reset Request',
      html: requestResetPasswordEmail(user.name, resetToken),
    });

    return { message: 'Thanks' };
  },

  async resetPassword(parent, args, ctx) {
    // check if legit reset token
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });

    if (!user) {
      throw new Error('Token is either invalid or expired');
    }

    // hash password
    const password = await bcrypt.hash(args.password, 10);

    // update user
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // generate JWT and cookie
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    return updatedUser;
  },

  async signup(parent, args, ctx, info) {
    // eslint-disable-next-line no-param-reassign
    args.email = args.email.toLowerCase();

    const invitationCode = await ctx.db.query.invitationCode({
      where: { code: args.invitationCode },
    });

    if (!invitationCode) {
      throw new Error('Invalid invitation code');
    }

    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info,
    );

    // create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    return user;
  },

  updateCategory(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to update categories');
    }

    const updates = { ...args };

    delete updates.id;

    return ctx.db.mutation.updateCategory(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  updateInvitationCode(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to update invitation codes');
    }

    const updates = { ...args };

    delete updates.id;

    return ctx.db.mutation.updateInvitationCode(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  updateMeat(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to update meats');
    }

    const updates = { ...args };

    delete updates.id;

    return ctx.db.mutation.updateMeat(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  updateUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const updates = { ...args };

    delete updates.id;

    if (args.id !== ctx.request.userId) {
      throw new Error('You can only edit your own profile');
    }

    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
};

module.exports = Mutations;
