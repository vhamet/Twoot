function onPost(parent, args, context) {
  return context.prisma.alert({ id: parent.id }).onPost();
}

function onComment(parent, args, context) {
  return context.prisma.alert({ id: parent.id }).onComment();
}

module.exports = {
  onPost,
  onComment,
};
