import { useState } from 'react';
import WysiwygEditor from '../../components/WysiwygEditor';
import { useRouter } from 'next/router';
import styles from '../../styles/newPosts.module.css'; // Import the CSS module

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });
    setLoading(false)
    router.push('/posts');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.newPostsh1}>Create New Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className={styles.input}
        />
        <WysiwygEditor value={content} onChange={setContent} className={styles.wysiwygEditor} />
        <button type="submit" disabled={loading} className={styles.button}>{!loading ? 'Create Post':'Adding Post...'}</button>
      </form>
    </div>
  );
}