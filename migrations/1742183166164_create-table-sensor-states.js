/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('sensor_states', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    sensor: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"sensors"("id")',
      onDelete: 'CASCADE',
    },
    state: {
      type: 'BOOLEAN',
      default: false,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('sensor_types');
};
