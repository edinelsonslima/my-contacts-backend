const db = require('../../database');

class CategoryRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM categories
      ORDER BY name ASC
    `);
    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM categories
      WHERE id = $1
    `, [id]);

    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  }

  // TODO: Retornar aviso que não pode ser deletado caso a categoria esteja sendo usada
  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM categories
      WHERE id = $1
      AND NOT EXISTS (
        SELECT 1 FROM contacts WHERE category_id = $1
      )
      RETURNING *
    `, [id]);

    return deleteOp;
  }
}

module.exports = new CategoryRepository();
