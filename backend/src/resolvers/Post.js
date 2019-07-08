function postedBy(parent, args, context) {
  return context.prisma.post({ id: parent.id }).postedBy();
}

async function fetchedComments(parent, args, context) {
  const count = await context.prisma
    .commentsConnection({ where: { postedOn: { id: parent.id } } })
    .aggregate()
    .count();

  const comments = await context.prisma
    .post({ id: parent.id })
    .comments({ last: 2, orderBy: 'createdAt_ASC' });

  return { comments, count };
}

function likes(parent, args, context) {
  return context.prisma.post({ id: parent.id }).likes();
}

function postedOn(parent, args, context) {
  return context.prisma.post({ id: parent.id }).postedOn();
}

module.exports = {
  postedBy,
  fetchedComments,
  likes,
  postedOn
};
