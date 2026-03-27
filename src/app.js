const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const leadRoutes = require('./routes/lead.routes');
const jobRoutes = require('./routes/job.routes');
const paymentRoutes = require('./routes/payment.routes');
const promotionRoutes = require('./routes/promotion.routes');
const technicianRoutes = require('./routes/technician.routes');
const locationRoutes = require('./routes/location.routes');

const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    code: 200,
    data: {
      message: 'Technician Service API',
      version: '1.0.0',
    },
    message: 'API is up',
    errors: null,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/location', locationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;