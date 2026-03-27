const Job = require('../models/job.model');

// Get all jobs (with populated details)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('customerId technicianId', 'name email role')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: jobs,
      message: 'Jobs fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};

// Create a new job (Basic version, primarily for testing or legacy support)
exports.createJob = async (req, res) => {
  try {
    const { customerId, serviceType, address, postalCode, scheduledDate } = req.body;

    if (!customerId || !serviceType || !address || !postalCode || !scheduledDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customerId, serviceType, address, postalCode, scheduledDate',
      });
    }

    const newJob = new Job({
      customerId,
      serviceType,
      location: {
        address,
        postalCode,
      },
      scheduledDate,
      status: 'pending',
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      data: newJob,
      message: 'Job created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error.message,
    });
  }
};

// Update job status by ID
exports.updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedJob,
      message: 'Job status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating job status',
      error: error.message,
    });
  }
};

// Start Job
exports.startJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(
      id,
      { status: 'in_progress', startTime: new Date() },
      { new: true }
    );
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job, message: 'Job started' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error starting job', error: error.message });
  }
};

// Pause Job
exports.pauseJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(
      id,
      { status: 'paused' },
      { new: true }
    );
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job, message: 'Job paused' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error pausing job', error: error.message });
  }
};

// Resume Job
exports.resumeJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(
      id,
      { status: 'in_progress' },
      { new: true }
    );
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job, message: 'Job resumed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error resuming job', error: error.message });
  }
};

// Complete Job
exports.completeJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const endTime = new Date();
    let totalDuration = 0;
    if (job.startTime) {
      totalDuration = Math.round((endTime.getTime() - new Date(job.startTime).getTime()) / 1000); // in seconds
    }

    job.status = 'completed';
    job.endTime = endTime;
    job.totalDuration = totalDuration;
    
    await job.save();

    res.status(200).json({ success: true, data: job, message: 'Job completed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error completing job', error: error.message });
  }
};
