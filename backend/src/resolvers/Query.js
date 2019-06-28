async function feed(parent, args, context) {
  const posts = await context.prisma.posts({
    after: args.after,
    first: args.first,
    orderBy: 'createdAt_DESC'
  });
  const cursor = posts.length && posts.length === args.first && posts[posts.length - 1].id;

  return {
    posts,
    cursor
  };
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
  user
};
