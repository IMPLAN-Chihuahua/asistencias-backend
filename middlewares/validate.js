const { validationResult, matchedData, query } = require("express-validator");

const paginationRules = () => ([
  query(['page', 'perPage']).optional()
    .isInt().toInt()
    .custom(v => v > 0).withMessage('Value must be greater than 0'),
]);

const errorFormatter = ({ location, msg, param }) => {
  return `${location}[${param}]: ${msg}`;
};

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  req.matchedData = matchedData(req);
  next();
};

module.exports = { validate, paginationRules }