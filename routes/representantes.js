const express = require('express');
const { param } = require('express-validator');
const { getRepresentantes, checkInRepresentante } = require('../controllers/representantesController');
const { paginate } = require('../middlewares/pagination');
const { paginationRules } = require('../middlewares/validate');
const router = express.Router();

router.get('/',
  paginationRules(),
  paginate,
  getRepresentantes);

router.patch('/:id',
  param('id').isInt().toInt(),
  checkInRepresentante);

module.exports = router;