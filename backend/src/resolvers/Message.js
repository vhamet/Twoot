function from(parent, args, context) {
  return context.prisma.message({ id: parent.id }).from();
}

function to(parent, args, context) {
  return context.prisma.message({ id: parent.id }).to();
}

module.exports = {
  from,
  to,
};
