const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class LogsService {
  constructor() {
    this._pool = new Pool();
  }

  async addLog(sensor, state) {
    const id = `log-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO logs VALUES($1, $2, $3) RETURNING id',
      values: [id, sensor, state],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Log gagal ditambahkan');
    }
    
    return result.rows[0].id;
  }

  async getLogs() {
    const result = await this._pool.query('SELECT * FROM logs');

    return result.rows;
  }
  
}

module.exports = LogsService;
