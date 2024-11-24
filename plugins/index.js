import { ImageSliderPlugin } from "./imageSlider";

export const plugin = {
  name: 'My Custom Plugin',
  version: '1.0.0',
  description: 'A plugin to add custom content blocks',
  registerBlocks: (register) => {
    register('image-slider', ImageSliderPlugin);
  },
  alterFrontend: (component) => {
    // Logic to alter the frontend
    return <div className="my-plugin">{component}</div>;
  },
};