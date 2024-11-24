import ImageSlider from "@/components/ImageSlider";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
export const ImageSliderPlugin = () => {

  const images = [
    image1,image2,image3
  ];

  return (
      <div className="image-slider">
        <ImageSlider images={images} />
      </div>
    )
};
  