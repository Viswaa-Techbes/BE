const Location = require('../models/location.model');

exports.updateLocation = async (req, res) => {
  try {
    const { technicianId, latitude, longitude } = req.body;

    if (!technicianId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required location data' });
    }

    // We can either update an existing document or create a new one. 
    // Creating a new one gives a history of locations.
    // However, if the frontend rapidly pings, we might want to just store the latest.
    // For Uber-like tracking, you often just want the *current* location for the manager, 
    // so let's do an upsert by technicianId to keep the DB small, 
    // or just insert a new one if you want history.
    // The instructions say: "POST /api/location/update ... Save location in DB. GET /api/location/:technicianId ... Return latest location."
    // Let's do an insert so we retain history, but we can query the latest.
    
    const location = new Location({
      technicianId,
      latitude,
      longitude
    });

    await location.save();

    res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    console.error('Update Location Error:', error);
    res.status(500).json({ success: false, message: 'Server error updating location' });
  }
};

exports.getLiveLocation = async (req, res) => {
  try {
    const { technicianId } = req.params;

    // Return the latest location
    const location = await Location.findOne({ technicianId }).sort({ createdAt: -1 });

    if (!location) {
      return res.status(404).json({ success: false, message: 'No location found for this technician' });
    }

    res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    console.error('Get Location Error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching location' });
  }
};
