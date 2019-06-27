async function feed(parent, args, context) {
  return await context.prisma.posts({
    after: args.after,
    first: args.first,
    orderBy: 'createdAt_DESC',
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
  user
};
