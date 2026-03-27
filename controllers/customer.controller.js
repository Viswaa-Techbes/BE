const Job = require('../models/job.model');

// Book a service
exports.bookService = async (req, res) => {
  try {
    const { serviceType, description, scheduledDate, location } = req.body;

    const job = await Job.create({
      customerId: req.user._id,
      serviceType,
      description,
      scheduledDate,
      location,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error booking service',
      error: error.message,
    });
  }
};

// Get my job history
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ customerId: req.user._id }).populate('technicianId', 'name phone');
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job history',
      error: error.message,
    });
  }
};
