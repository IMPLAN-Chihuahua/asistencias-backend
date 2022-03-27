const { Dependencia } = require('../models');

const getDependencias = async (req, res) => {
  try {
    const { offset, limit, page } = req;
    const dependencias = await Dependencia.findAndCountAll({
      offset,
      limit
    });
    const total = dependencias.count;
    const totalPages = Math.ceil(total / limit);
    return res.json({
      total,
      totalPages,
      page,
      perPage: limit,
      data: [...dependencias.rows]
    });
  } catch (error) {
    process.stdout.write(`${error.message}\n`);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getDependencias,
}