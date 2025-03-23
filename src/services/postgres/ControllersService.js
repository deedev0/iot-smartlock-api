const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class ControllersService {
  constructor() {
    this._pool = new Pool();
  }

  async getControllerById(controllerId) {
    const query = {
      text: 'SELECT * FROM controllers WHERE id = $1',
      values: [controllerId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Controller tidak ditemukan');
    }

    return result.rows[0];
  }

  async addController(owner, name) {
    const id = `controller-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO controllers VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Controller gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async deleteControllerById(id, owner) {
    await this.verifyControllerOwner(id, owner);
    
    const query = {
      text: 'DELETE FROM controllers WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async editControllerById(owner, { id, name }) {
    await this.verifyControllerOwner(id, owner);

    const query = {
      text: 'UPDATE controllers SET name = $1 WHERE id = $2',
      values: [name, id],
    };

    await this._pool.query(query);
  }

  async verifyControllerOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM controllers WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Controller tidak ditemukan');
    }

    const controller = result.rows[0];

    if (controller.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = ControllersService;
