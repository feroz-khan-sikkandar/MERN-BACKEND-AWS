// controllers/adminController.js
const adminService = require('../services/adminService');

const getAdminStats = async (req, res) => {
  try {
    const stats = await adminService.calculateAdminStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

module.exports = {
  getAdminStats,
};
