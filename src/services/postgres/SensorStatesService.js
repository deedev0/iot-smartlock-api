const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SensorStatesService {
  constructor(sensorsService, logsService) {
    this._pool = new Pool();
    this._sensorService = sensorsService;
    this._logsService = logsService;
  }

  async addSensorState(sensor) {
    const id = `state-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO sensor_states VALUES($1, $2, $3)',
      values: [id, sensor, false],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan state');
    }

    await this._logsService.addLog(sensor, false);
  }
  
  async getSensorState(sensor) {
    const query = {
      text: 'SELECT * FROM sensor_states WHERE sensor = $1',
      values: [sensor],
    }
    
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Sensor state tidak ditemukan');
    }

    return result.rows[0];
  }
  
  async editSensorState(owner, { sensorId, state }) {
    await this._sensorService.verifySensorOwner(sensorId, owner);
    
    const query = {
      text: 'UPDATE sensor_states SET state = $1 WHERE sensor = $2',
      values: [state, sensorId],
    };
    
    await this._pool.query(query);
    await this._logsService.addLog(sensorId, state);
  }
}

module.exports = SensorStatesService;
