const { Representante, Dependencia, sequelize } = require('../models');

const getRepresentantes = async (req, res) => {
  try {
    const { limit, offset, page } = req;
    const filters = { where: {} };
    if ('checkedIn' in req.matchedData) {
      filters.where.checkedIn = true;
    }
    const representantes = await Representante.findAndCountAll({
      ...filters,
      limit,
      offset,
      include: {
        model: Dependencia,
        require: true,
        attributes: []
      },
      attributes: [
        'id',
        'name',
        [sequelize.col('"dependencia"."name"'), 'dependenciaName'],
        'hasVoto',
        'checkedIn',
        'leftAt',
        'createdAt',
        'updatedAt',
      ]
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

const updateRepresentante = async (req, res) => {
  try {
    const { id, action } = req.matchedData;
    let representante = {};

    if (action === 'join') {
      representante.checkInDate = new Date();
      representante.checkedIn = true;
      representante.inMeeting = true;
    } else if (action === 'kickout') {
      representante.leftAt = new Date();
      representante.inMeeting = false;
    }

    await Representante.update({ ...representante }, {
      where: { id }
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
  updateRepresentante
}