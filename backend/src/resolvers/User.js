function posts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).posts();
}

function comments(parent, args, context) {
  return context.prisma.user({ id: parent.id }).comments();
}

function friends(parent, args, context) {
  return context.prisma.user({ id: parent.id }).friends();
}

module.exports = {
  posts,
  comments,
  friends
};
