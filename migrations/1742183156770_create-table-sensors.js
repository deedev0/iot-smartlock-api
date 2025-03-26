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
  pgm.createTable('sensors', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },    
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    sensor_type: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    controller: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"controllers"("id")',
      onDelete: 'CASCADE',
    },
    is_active: {
      type: 'BOOLEAN',
      default: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('sensors');
};
