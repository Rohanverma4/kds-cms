import { createPost, getPosts } from '../../models/Post';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, slug, content } = req.body;
    const post = await createPost(title, slug, content);
    res.status(201).json(post);
  } else if (req.method === 'GET') {
    const posts = await getPosts();
    res.status(200).json(posts);
  }
}
