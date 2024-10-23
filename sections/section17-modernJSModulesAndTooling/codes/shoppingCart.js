let cart = [];
const addCart = function (product, quantity) {
  cart.push({ quantity, product });
  console.log(`The product is ${product} and his quantity is ${quantity}`);
};

// Exporting Module
module.exports = {
  addCart,
};
