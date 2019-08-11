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

  async createDirection(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to create an ingredient');
    }

    const direction = ctx.db.mutation.createDirection(
      {
        data: {
          ...args,
        },
      },
      info,
    );

    return direction;
  },

  async createIngredient(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to create an ingredient');
    }

    const ingredient = ctx.db.mutation.createIngredient(
      {
        data: {
          ...args,
        },
      },
      info,
    );

    return ingredient;
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

  async createRecipe(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const formValues = args;

    const ingredientCreations = formValues.ingredients.map(async (i) => {
      const ingredient = await ctx.db.mutation.createIngredient(
        {
          data: {
            name: i.name,
          },
        },
        '{ id }',
      );

      return ingredient;
    });

    const ingredients = await Promise.all(ingredientCreations);

    const directionCreations = formValues.directions.map(async (d) => {
      const direction = await ctx.db.mutation.createDirection(
        {
          data: {
            direction: d.direction,
            sortOrder: d.sortOrder,
          },
        },
        '{ id }',
      );

      return direction;
    });

    const directions = await Promise.all(directionCreations);

    const recipe = await ctx.db.mutation.createRecipe(
      {
        data: {
          name: formValues.name,
          public: formValues.public,
          source: formValues.source,
          sourceUrl: formValues.sourceUrl,
          time: formValues.time,
          activeTime: formValues.activeTime,
          servings: formValues.servings,
          calories: formValues.calories,
          carbohydrates: formValues.carbohydrates,
          protein: formValues.protein,
          fat: formValues.fat,
          sugar: formValues.sugar,
          cholesterol: formValues.cholesterol,
          fiber: formValues.fiber,
          image: formValues.image,
          largeImage: formValues.largeImage,
          ingredients: {
            connect: ingredients,
          },
          directions: {
            connect: directions,
          },
          categories: {
            connect: formValues.categories,
          },
          meats: {
            connect: formValues.meats,
          },
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
        },
      },
      info,
    );

    return recipe;
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

    // TODO: Delete the category link to the recipes its attached to

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

    // TODO: Delete the meat link to the recipes its attached to

    return ctx.db.mutation.deleteMeat({ where }, info);
  },

  async deleteUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const where = { id: args.id };

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error('You do not have the proper permissions to delete a user');
    }

    // TODO: Update all recipes that user created to the admin deleting the user

    return ctx.db.mutation.deleteUser({ where }, info);
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
    const formValues = args;

    if (parseInt(process.env.PUBLIC_REGISTRATION, 10) === 0) {
      const invitationCode = await ctx.db.query.invitationCode({
        where: { code: formValues.invitationCode },
      });

      if (!invitationCode) {
        throw new Error('Invalid invitation code');
      }
    }

    if (typeof formValues.invitationCode !== 'undefined') {
      delete formValues.invitationCode;
    }

    formValues.email = args.email.toLowerCase();

    const password = await bcrypt.hash(formValues.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...formValues,
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

  async toggleAdmin(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN'].includes(permission));

    if (!hasPermissions) {
      throw new Error("You do not have the proper permissions to update the user's permissions");
    }

    const user = await ctx.db.query.user(
      {
        where: { id: args.id },
      },
      '{ permissions }',
    );

    let permissions = ['USER'];
    if (!user.permissions.includes('ADMIN')) {
      permissions = ['ADMIN', 'USER'];
    }

    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: { set: permissions },
        },
        where: {
          id: args.id,
        },
      },
      info,
    );
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
