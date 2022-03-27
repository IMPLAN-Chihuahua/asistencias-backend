const { Representante } = require('../models');

const getRepresentantes = async (req, res) => {
  try {
    const { limit, offset, page } = req;
    const representantes = await Representante.findAndCountAll({
      limit,
      offset
    });
    const total = representantes.count;
    const totalPages = Math.ceil(total / limit);
    return res.json({
      total,
      totalPages,
      page,
      perPage: limit,
      data: [...representantes.rows]
    })
  } catch (error) {
    process.stdout.write(`${error.message}\n`);
    return res.status(500).send(error.message);
  }
}

const getRepresentantesByDependencia = async (req, res) => {
  try {
    const { limit, offset, page } = req;
    const idDependencia = parseInt(req.params.id);

    const representantes = await Representante.findAndCountAll({
      where: {
        idDependencia
      },
      offset,
      limit
    });

    const total = representantes.count;
    const totalPages = Math.ceil(total / (limit));

    return res.json({
      total,
      totalPages,
      page,
      perPage: limit,
      data: [...representantes.rows]
    });

  } catch (error) {
    process.stdout.write(`${error.message}\n`);
    return res.status(500).send(error.message);
  }
}

const checkInRepresentante = async (req, res) => {
  try {
    const checkedIn = req.body.checkedIn;
    const representanteId = parseInt(req.params.id);
    await Representante.update({ checkedIn }, {
      where: { id: representanteId }
    });
    return res.sendStatus(200);
  } catch (error) {
    process.stdout.write(`${error.message}\n`);
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getRepresentantes,
  getRepresentantesByDependencia,
  checkInRepresentante
}