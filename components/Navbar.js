import Link from 'next/link';
import styles from '../styles/navbar.module.css'
export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="/posts" className={styles.link}>Posts</Link>
      <Link href="/posts/new" className={styles.link}>New Post</Link>
      <Link href="/pages" className={styles.link}>Pages</Link>
      <Link href="/pages/new" className={styles.link}>New Page</Link>
    </nav>
  );
}