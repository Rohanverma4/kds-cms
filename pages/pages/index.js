import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/pages.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Pages() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch('/api/pages');
      const data = await res.json();
      setPages(data);
    };
    fetchPages();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeadingContainer}>
      <h1 className={styles.pageHeading}>Pages</h1>
      <Link href="/pages/new" className={styles.link}>Create New Page</Link>
      </div>
      <ul className={styles.pageUl}>
        {pages.map(page => (
          <li className={styles.pageLi} key={page.id}>
            <Link href={`/pages/${page.id}`} className={styles.pageLink}>{page.title}</Link>
            <div className={styles.iconContainer}>
              <Link href={`/pages/${page.id}`} className={styles.iconLink}>
                <FontAwesomeIcon icon={faEdit} className={styles.icon} />
              </Link>
              <button 
                className={styles.iconLink} 
                onClick={() => handleDelete(page.id)} // Implement handleDelete function
                aria-label={`Delete ${page.title}`}
              >
                <FontAwesomeIcon icon={faTrash} className={styles.icon} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}