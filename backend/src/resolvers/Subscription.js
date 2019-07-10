function newAlertSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.alert({ mutation_in: ['CREATED'] }).node();
}

const newAlert = {
  subscribe: newAlertSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newAlert,
}