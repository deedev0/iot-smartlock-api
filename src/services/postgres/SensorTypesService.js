const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SensorTypesService {
  constructor() {
    this._pool = new Pool();
  }

  async getSensorTypes() {
    const query = {
      text: 'SELECT * FROM sensor_types',
      values: [],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async addSensorType(type, name) {
    const id = `type-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO sensor_types VALUES($1, $2, $3) RETURNING id',
      values: [id, type, name],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Controller Type gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async deleteSensorType(id) {
    const query = {
      text: 'DELETE FROM sensor_types WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async editSensorType({ id, name, type }) {
    const query = {
      text: 'UPDATE sensor_types SET type = $1, name = $2 WHERE id = $3 RETURNING id',
      values: [type, name, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Sensor Type. Id tidak ditemukan');
    }
  }
}

module.exports = SensorTypesService;
