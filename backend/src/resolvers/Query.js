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

module.exports = {
  feed
};
