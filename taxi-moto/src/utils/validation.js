export function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}
export function isCompletedOrder(order) {
  return Object.keys(order.state).reduce(
    (prevValid, actualValid) => prevValid && order.state[actualValid],
    true
  );
}
