const express = require('express');
const { param, query } = require('express-validator');
const { getDependencias } = require('../controllers/dependenciasController');
const { getRepresentantesByDependencia } = require('../controllers/representantesController');
const { paginate } = require('../middlewares/pagination');
const { validate, paginationRules } = require('../middlewares/validate');
const router = express.Router();

router.get('/',
  paginationRules(),
  validate,
  paginate,
  getDependencias);

router.get('/:id/representantes',
  param('id').isInt().toInt(),
  validate,
  paginate,
  getRepresentantesByDependencia)

module.exports = router;