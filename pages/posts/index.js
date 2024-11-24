import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/posts.module.css'

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.postHeadingContainer}>
      <h1 className={styles.postHeading}>Posts</h1>
      <Link href="/posts/new" className={styles.link}>Create New Post</Link>
      </div>
      <ul className={styles.postUl}>
        {posts.map(post => (
          <li className={styles.postLi} key={post.id}>
            <Link href={`/posts/${post.id}`} className={styles.postLink}>{post.title}</Link>
            <div className={styles.iconContainer}>
              <Link href={`/posts/${post.id}`} className={styles.iconLink}>
                <FontAwesomeIcon icon={faEdit} className={styles.icon} />
              </Link>
              <button 
                className={styles.iconLink} 
                onClick={() => handleDelete(post.id)} // Implement handleDelete function
                aria-label={`Delete ${post.title}`}
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