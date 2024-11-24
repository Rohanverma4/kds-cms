
import pluginRegistry from '@/plugins/pluginRegistry';
import { plugin } from '@/plugins';
import ContentRenderer from '../components/ContentRenderer';
import Navbar from '@/components/Navbar';
import '../styles/globals.css';

pluginRegistry.registerPlugin(plugin);

function MyApp({ Component, pageProps }) {
  // Example blocks to render
  const blocks = [
    { type: 'image-slider', props: {  } },
    { type: 'custom-form', props: {  } },
  ];
  
  const enhancedComponent = pluginRegistry.alterFrontend(<Component {...pageProps} />);
  
  return (
    <div>
      <Navbar />
      {enhancedComponent}
      <ContentRenderer blocks={blocks} />
    </div>
  );
}

export default MyApp;