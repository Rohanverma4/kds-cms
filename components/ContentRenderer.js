import pluginRegistry from "@/plugins/pluginRegistry";
import { useRouter } from "next/router";

const ContentRenderer = ({ blocks }) => {

  const router = useRouter()

  if (router.pathname !== '/') {
    return null
  }
  return (
    <div>
      {blocks.map((block, index) => {
        const { type, props } = block; 
        return (
          <div key={index}>
            {pluginRegistry.renderBlock(type, props)}
          </div>
        );
      })}
    </div>
  );
};

export default ContentRenderer;