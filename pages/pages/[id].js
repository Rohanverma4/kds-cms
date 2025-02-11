import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WysiwygEditor from '../../components/WysiwygEditor';
import styles from '../../styles/pageDetails.module.css'; // Import the CSS module

export default function PageDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [page, setPage] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPage = async () => {
        const res = await fetch(`/api/pages/${id}`);
        const data = await res.json();
        setPage(data);
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
      };
      fetchPage();
    }
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    await fetch(`/api/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });
    setLoading(false);
    router.push('/pages');
  };

  if (!page) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className={styles.pageDetailTitle} 
        placeholder="Enter title"
      />
      <input 
        value={slug} 
        onChange={(e) => setSlug(e.target.value)} 
        className={styles.pageDetailTitle} 
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
        {loading ? 'Updating...' : 'Update Page'}
      </button>
    </div>
  );
}
