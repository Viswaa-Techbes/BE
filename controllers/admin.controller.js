const User = require('../models/user.model');
const Job = require('../models/job.model');

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' });
    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customers',
      error: error.message,
    });
  }
};

// Get all technicians
exports.getTechnicians = async (req, res) => {
  try {
    const technicians = await User.find({ role: 'technician' });
    res.status(200).json({
      success: true,
      data: technicians,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching technicians',
      error: error.message,
    });
  }
};

// Create and assign job
exports.createJob = async (req, res) => {
  try {
    const { customerId, technicianId, serviceType, description, priority, scheduledDate, location } = req.body;

    const job = await Job.create({
      customerId,
      technicianId,
      serviceType,
      description,
      priority,
      scheduledDate,
      location,
      status: technicianId ? 'assigned' : 'pending',
    });

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error.message,
    });
  }
};

// Get all jobs with filters
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('customerId technicianId', 'name email phone role');
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};
