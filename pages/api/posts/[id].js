import { getPostById, updatePost, deletePost } from '../../../models/Post';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await getPostById(id);
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    const { title, slug, content } = req.body;
    const updatedPost = await updatePost(id, title, slug, content);
    res.status(200).json(updatedPost);
  } else if (req.method === 'DELETE') {
    await deletePost(id);
    res.status(204).end();
  }
}