const Order = require('../models/order');
const Book = require('../models/book');

const calculateAdminStats = async () => {
  // 1. Total number of orders
  const totalOrders = await Order.countDocuments();

  // 2. Total sales (sum of all totalPrice from orders)
  const totalSalesResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalPrice" },
      }
    }
  ]);
  const totalSales = totalSalesResult[0]?.totalSales || 0;

  // 3. Trending books statistics:
  const trendingBooksCountResult = await Book.aggregate([
    { $match: { trending: true } }, // Match only trending books
    { $count: "trendingBooksCount" } // Return the count of trending books
  ]);
  const trendingBooks = trendingBooksCountResult.length > 0 ? trendingBooksCountResult[0].trendingBooksCount : 0;

  // 4. Total number of books
  const totalBooks = await Book.countDocuments();

  // 5. Monthly sales (group by month and sum total sales for each month)
  const monthlySales = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
        totalSales: { $sum: "$totalPrice" }, // Sum totalPrice for each month
        totalOrders: { $sum: 1 } // Count total orders for each month
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return {
    totalOrders,
    totalSales,
    trendingBooks,
    totalBooks,
    monthlySales,
  };
};

module.exports = {
  calculateAdminStats,
};
