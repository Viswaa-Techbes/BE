const Job = require('../models/job.model');

// Get assigned jobs for the logged-in technician
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ technicianId: req.user._id }).populate('customerId', 'name phone location');
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

// Update job status
exports.updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const job = await Job.findOne({ _id: id, technicianId: req.user._id });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or not assigned to you',
      });
    }

    job.status = status;
    if (note) {
      job.notes.push({
        text: note,
        author: req.user.name,
      });
    }

    await job.save();

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating job status',
      error: error.message,
    });
  }
};
