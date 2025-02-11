import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WysiwygEditor from '../../components/WysiwygEditor';
import styles from '../../styles/postDetails.module.css'; // Import the CSS module

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch Post Data
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
      };
      fetchPost();
    }
  }, [id]);

  // Update Post
  const handleUpdate = async () => {
    setLoading(true);
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });
    setLoading(false);
    router.push('/posts');
  };

  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className={styles.postDetailTitle} 
        placeholder="Enter title"
      />
      <input 
        value={slug} 
        onChange={(e) => setSlug(e.target.value)} 
        className={styles.postDetailTitle} 
        placeholder="Enter slug"
      />
      <WysiwygEditor 
        value={content} 
        onChange={setContent} 
        className={styles.wysiwygEditor} 
      />

      {/* Update Button */}
      <button 
        onClick={handleUpdate} 
        disabled={loading} 
        className={styles.button}
      >
        {loading ? 'Updating...' : 'Update Post'}
      </button>
    </div>
  );
}
