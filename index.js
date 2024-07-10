const express = require("express");
const app = express();
const port = 3000;
let cors = require("cors");

app.use(cors());

let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];

app.get("/", (req, res) => {
  res.send("Welcome to flip deal page");
});

//Endpoint 1: Add an Item to the Cart
function addProduct(carts, productId, name, price, quantity) {
  carts.push({ productId, name, price, quantity });
  return carts;
}
app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let result = addProduct(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

//Endpoint 2: Edit Quantity of an Item in the Cart
function updateQuantityFromProductId(carts, productId, quantity) {
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].productId === productId) {
      carts[i].quantity = quantity;
    }
  }
  return carts;
}
app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantityFromProductId(cart, productId, quantity);
  res.json({ cartItems: result });
});

//Endpoint 3: Delete an Item from the Cart
function deleteItemByProductId(cart, productId) {
  return cart.productId !== productId;
}
app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) => deleteItemByProductId(cart, productId));
  cart = result;
  res.json({ cartItems: result });
});

//Endpoint 4: Read Items in the Cart
function returnCartItems(carts) {
  return carts;
}
app.get("/cart", (req, res) => {
  let result = returnCartItems(cart);
  res.json({ cartItems: result });
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart
function caluclateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}
app.get("/cart/total-quantity", (req, res) => {
  let result = caluclateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

// Calculate Total Price of Items in the Cart
function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}
app.get("/cart/total-price", (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log("Server is running on port https://localhost:" + port);
});
