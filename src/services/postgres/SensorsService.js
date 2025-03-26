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

  async getSensors(owner, contollerId) {

    const query = {
      text: 'SELECT * FROM controllers WHERE id = $1',
      values: [contollerId],
    };

    
    const result = await this._pool.query(query);
    const controller = result.rows[0];

    if (owner !== controller.owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }

    const sensors = await this._pool.query('SELECT * FROM sensors WHERE controller = $1', [controller.id]);

    return sensors.rows;
  }

  async getSensorById(id, owner) {
    await this.verifySensorOwner(id, owner);

    const query = {
      text: 'SELECT * FROM sensors WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async addSensor(name, sensorTypeId, controllerId) {
    const id = `sensors-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO sensors VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, sensorTypeId, controllerId, true],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Sensor gagal ditambahkan');
    }

    const sensorId = result.rows[0].id;

    await this._sensorStateService.addSensorState(sensorId);
    
    return sensorId;
  }

  async deleteSensorById(id, owner) {
    await this.verifySensorOwner(id, owner);

    const query = {
      text: 'DELETE FROM sensors WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async editSensorById(owner, { id, name, sensorTypeId, isActive = true }) {
    await this.verifySensorOwner(id, owner);

    const query = {
      text: 'UPDATE sensors SET name = $1, sensor_type = $2, is_active = $3 WHERE id = $4',
      values: [name, sensorTypeId, isActive, id],
    };

    const result = await this._pool.query(query);
    console.log(result);
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
