import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WysiwygEditor from '../../components/WysiwygEditor';
import styles from '../../styles/pageDetails.module.css'

export default function PageDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(null);
  const [content, setContent] = useState('');
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPage = async () => {
        const res = await fetch(`/api/pages/${id}`);
        const data = await res.json();
        setPage(data);
        setContent(data.content);
      };
      fetchPage();
    }
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true)
    await fetch(`/api/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: page.title, slug: page.slug, content }),
    });
    setLoading(false)
    router.push('/pages');
  };

  if (!page) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageDetailh1}>{page.title}</h1>
      <WysiwygEditor value={content} onChange={setContent} className={styles.wysiwygEditor} />
      <button onClick={handleUpdate} disabled={loading} className={styles.button}>{!loading ? 'Update Page': 'Updating...'}</button>
    </div>
  );
}