import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const createPost = async (title, slug, content) => {
  const res = await pool.query(
    'INSERT INTO posts (title, slug, content) VALUES ($1, $2, $3) RETURNING *',
    [title, slug, content]
  );
  return res.rows[0];
};

export const getPosts = async () => {
  const res = await pool.query('SELECT * FROM posts');
  return res.rows;
};

export const getPostById = async (id) => {
  const res = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return res.rows[0];
};

export const updatePost = async (id, title, slug, content) => {
  const res = await pool.query(
    'UPDATE posts SET title = $1, slug = $2, content = $3 WHERE id = $4 RETURNING *',
    [title, slug, content, id]
  );
  return res.rows[0];
};

export const deletePost = async (id) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
};