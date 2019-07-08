function posts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).posts();
}

function comments(parent, args, context) {
  return context.prisma.user({ id: parent.id }).comments();
}

function following(parent, args, context) {
  return context.prisma.user({ id: parent.id }).following();
}

function followers(parent, args, context) {
  return context.prisma.user({ id: parent.id }).followers();
}

function timelinePosts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).timelinePosts();
}

module.exports = {
  posts,
  comments,
  following,
  followers,
  timelinePosts
};
