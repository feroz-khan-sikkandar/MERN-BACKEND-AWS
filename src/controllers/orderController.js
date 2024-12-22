const orderService = require('../services/orderService');


const createOrder = async (req, res, next) => {
  try {
    console.log(req.body)
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      message: "Order added successfully!",
      order: order
    });
  } catch (error) {
    next(error);
  }
};

const getOrderByEmailId = async (req, res, next) => {

  
  const { emailId } = req.params
  console.log("emailId", emailId)

  try {
    const order = await orderService.getOrderByEmailId( emailId );

    console.log("order", order)

    // If the order is not found, return a 404 error
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return the list of orders
    res.status(200).json(order);

  } catch (error) {
    next(error);
  }

}

module.exports = { createOrder, getOrderByEmailId };