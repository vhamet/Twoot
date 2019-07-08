async function feed(parent, args, context) {
  const posts = await context.prisma.posts({
    where: {
      OR: [
        { isPrivate: null },
        { isPrivate: false },
        { postedBy: { id: args.logged } },
        { postedBy: { followers_some: { id: args.logged } } }
      ]
    },
    after: args.after,
    first: args.first,
    orderBy: 'createdAt_DESC'
  });
  const cursor =
    (posts.length &&
      posts.length === args.first &&
      posts[posts.length - 1].id) ||
    '';

  return {
    posts,
    cursor
  };
}

async function timeline(parent, args, context) {
  const posts = await context.prisma.posts({
    where: {
      AND: [
        {
          OR: [{ postedBy: { id: args.user } }, { postedOn: { id: args.user } }]
        },
        {
          OR: [
            { isPrivate: null },
            { isPrivate: false },
            { postedBy: { id: args.logged } },
            { postedBy: { followers_some: { id: args.logged } } }
          ]
        }
      ]
    },
    after: args.after,
    first: args.first,
    orderBy: 'createdAt_DESC'
  });
  const cursor =
    (posts.length &&
      posts.length === args.first &&
      posts[posts.length - 1].id) ||
    '';

  return {
    posts,
    cursor
  };
}

async function moreComments(parent, args, context) {
  return await context.prisma.comments({
    where: { postedOn: { id: args.postId } },
    before: args.before,
    last: args.last,
    orderBy: 'createdAt_ASC'
  });
}

async function user(parent, args, context) {
  const user = await context.prisma.user({
    id: args.id
  });
  delete user.password;

  return { ...user, id: args.id };
}

module.exports = {
  feed,
  timeline,
  moreComments,
  user
};
