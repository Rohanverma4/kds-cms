import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WysiwygEditor from '../../components/WysiwygEditor';
import styles from '../../styles/postDetails.module.css'; // Import the CSS module

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
        setContent(data.content);
      };
      fetchPost();
    }
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: post.title, slug: post.slug, content }),
    });
    router.push('/posts');
  };

  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.postDetailh1}>{post.title}</h1>
      <WysiwygEditor value={content} onChange={setContent} className={styles.wysiwygEditor} />
      <button onClick={handleUpdate} className={styles.button}>Update Post</button>
    </div>
  );
}