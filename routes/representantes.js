const express = require('express');
const { param, body, query } = require('express-validator');
const { getRepresentantes, updateRepresentante } = require('../controllers/representantesController');
const { paginate } = require('../middlewares/pagination');
const { paginationRules, validate } = require('../middlewares/validate');
const router = express.Router();

router.get('/',
  paginationRules(),
  query('checkedIn').optional(),
  validate,
  paginate,
  getRepresentantes);

router.patch(
  '/:id/:action',
  param('id').isInt().toInt(),
  param('action').trim().toLowerCase().isIn(['kickout', 'join', 'checkin']),
  validate,
  updateRepresentante
);

module.exports = router;