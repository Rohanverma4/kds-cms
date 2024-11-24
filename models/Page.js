import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const createPage = async (title, slug, content) => {
  const res = await pool.query(
    'INSERT INTO pages (title, slug, content) VALUES ($1, $2, $3) RETURNING *',
    [title, slug, content]
  );
  return res.rows[0];
};

export const getPages = async () => {
  const res = await pool.query('SELECT * FROM pages');
  return res.rows;
};

export const getPageById = async (id) => {
  const res = await pool.query('SELECT * FROM pages WHERE id = $1', [id]);
  return res.rows[0];
};

export const updatePage = async (id, title, slug, content) => {
  const res = await pool.query(
    'UPDATE pages SET title = $1, slug = $2, content = $3 WHERE id = $4 RETURNING *',
    [title, slug, content, id]
  );
  return res.rows[0];
};

// Delete a page
export const deletePage = async (id) => {
  await pool.query('DELETE FROM pages WHERE id = $1', [id]);
};