function postedOn(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).postedOn();
}

function postedBy(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).postedBy();
}

function likes(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).likes();
}

module.exports = {
  postedOn,
  postedBy,
  likes,
};
