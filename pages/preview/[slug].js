import { useRouter } from 'next/router';

export default function PreviewPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch post data based on slug...
  return <div>Preview of {slug}</div>;
}
