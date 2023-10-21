export const calculateTotal = (cart) => {
  let totalAmount = 0;
  let totalInCart = 0;
  for (let { price, amount } of cart.values()) {
    totalAmount += price * amount;
    totalInCart += amount;
  }
  return { totalAmount, totalInCart };
};
