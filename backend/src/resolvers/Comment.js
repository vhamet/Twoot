function postedOn(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).postedOn();
}

function postedBy(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).postedBy();
}

module.exports = {
  postedOn,
  postedBy,
};
