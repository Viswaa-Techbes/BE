const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { userIdParamSchema, userUpdateSchema, paginationSchema } = require('../validation/user.validation');

router.get('/', authenticate, authorize('admin'), validate(paginationSchema), userController.getUsers);
router.get('/:id', authenticate, authorize('admin'), validate(userIdParamSchema), userController.getUser);
router.patch('/:id', authenticate, authorize('admin'), validate(userUpdateSchema), userController.updateUser);
router.delete('/:id', authenticate, authorize('admin'), validate(userIdParamSchema), userController.deleteUser);

module.exports = router;