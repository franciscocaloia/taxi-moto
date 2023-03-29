export function isCompletedOrder(order) {
  return Object.keys(order.state).reduce(
    (prevValid, actualValid) => prevValid && order.state[actualValid],
    true
  );
}
