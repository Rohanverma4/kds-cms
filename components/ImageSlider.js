import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/imageSlider.module.css';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.slider}>
      <button className={styles.button} onClick={prevImage}>❮</button>
      <Image 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex + 1}`} 
        className={styles.image} 
        layout="responsive" 
        width={800}
        height={400}
      />
      <button className={styles.button} onClick={nextImage}>❯</button>
    </div>
  );
};

export default ImageSlider;
