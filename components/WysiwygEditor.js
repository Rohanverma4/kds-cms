import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function WysiwygEditor({ value, onChange }) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          ['clean'],
        ],
      }}
    />
  );
}