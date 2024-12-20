import { useState } from 'react';
import WysiwygEditor from '../../components/WysiwygEditor';
import { useRouter } from 'next/router';
import styles from '../../styles/newPages.module.css';

export default function NewPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });
    setLoading(false)
    router.push('/pages');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.newPagesh1}>Create New Page</h1>
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
        <button type="submit" disabled={loading} className={styles.button}>{!loading ? 'Create Page':'Adding Page...'}</button>
      </form>
    </div>
  );
}