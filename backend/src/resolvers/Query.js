async function feed(parent, args, context) {
  const where = {};
  const posts = await context.prisma.posts({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });
  const count = await context.prisma
    .postsConnection({
      where
    })
    .aggregate()
    .count();

  return {
    posts,
    count
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
