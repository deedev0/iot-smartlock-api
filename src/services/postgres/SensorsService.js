const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class SensorsService {
  constructor(sensorStateService) {
    this._pool = new Pool();
    this._sensorStateService = sensorStateService;
  }

  async addSensor(sensorTypeId, controllerId) {
    const id = `sensors-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO sensors VALUES($1, $2, $3) RETURNING id',
      values: [id, sensorTypeId, controllerId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Sensor gagal ditambahkan');
    }

    const sensorId = result.rows[0].id;

    await this._sensorStateService.addSensorState(sensorId);
    
    return sensorId;
  }

  async deleteSensor(id, owner) {
    await this.verifySensorOwner(id, owner);

    const query = {
      text: 'DELETE FROM sensors WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async editSensor(owner, { id, sensorTypeId }) {
    await this.verifySensorOwner(id, owner);

    const query = {
      text: 'UPDATE sensors SET sensor_type = $1 WHERE id = $1',
      values: [sensorTypeId, id],
    };

    await this._pool.query(query);
  }

  async verifySensorOwner(id, owner) {
    const query = {
      text: `SELECT u.id AS ownerid 
             FROM sensors s 
             LEFT JOIN controllers c ON s.controller = c.id 
             LEFT JOIN users u ON c.owner = u.id 
             WHERE s.id = $1`,
      values: [id],
    };
  
    const result = await this._pool.query(query);
    const sensor = result.rows[0];
  
    // Jika sensor tidak ditemukan
    if (!sensor) {
      throw new NotFoundError('Sensor tidak ditemukan');
    }
  
    // Jika owner tidak sesuai atau sensor tidak memiliki owner
    if (!sensor.ownerid || sensor.ownerid !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
  
}

module.exports = SensorsService;
