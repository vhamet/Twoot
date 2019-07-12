function newAlertSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.alert({ mutation_in: ['CREATED'] }).node();
}

const newAlert = {
  subscribe: newAlertSubscribe,
  resolve: payload => {
    return payload
  },
}

function newMessageSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.message({ mutation_in: ['CREATED'] }).node();
}

const newMessage = {
  subscribe: newMessageSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newAlert,
  newMessage,
}