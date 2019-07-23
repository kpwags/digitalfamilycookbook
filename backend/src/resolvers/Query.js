const { forwardTo } = require('prisma-binding');

const Query = {
  categories(parent, args, ctx, info) {
    return ctx.db.query.categories(
      {
        orderBy: 'name_ASC',
      },
      info,
    );
  },

  category: forwardTo('db'),

  invitationCode: forwardTo('db'),
  invitationCodes: forwardTo('db'),

  me(parent, args, ctx, info) {
    // check if there is a user id
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info,
    );
  },

  meat: forwardTo('db'),

  meats(parent, args, ctx, info) {
    return ctx.db.query.meats(
      {
        orderBy: 'name_ASC',
      },
      info,
    );
  },

  user: forwardTo('db'),
};

module.exports = Query;
