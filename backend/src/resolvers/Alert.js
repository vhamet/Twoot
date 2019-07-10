function onPost(parent, args, context) {
  return context.prisma.alert({ id: parent.id }).onPost();
}

function onComment(parent, args, context) {
  return context.prisma.alert({ id: parent.id }).onComment();
}

function onFollower(parent, args, context) {
  return context.prisma.alert({ id: parent.id }).onFollower();
}

function onFollowed(parent, args, context) {
  return context.prisma.alert({ id: parent.id }).onFollowed();
}

module.exports = {
  onPost,
  onComment,
  onFollower,
  onFollowed,
};
