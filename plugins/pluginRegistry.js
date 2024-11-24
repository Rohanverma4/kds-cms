const pluginRegistry = {
  plugins: [],
  registeredBlocks: {}, // Object to hold registered blocks
  
  registerPlugin(plugin) {
    this.plugins.push(plugin);
    if (plugin.registerBlocks) {
      plugin.registerBlocks(this.registerBlock.bind(this)); // Bind the context
    }
  },
  
  registerBlock(type, component) {
    this.registeredBlocks[type] = component;
    console.log(`Registered block: ${type}`);
  },

  alterFrontend(component) {
    return this.plugins.reduce((acc, plugin) => {
      if (plugin.alterFrontend) {
        return plugin.alterFrontend(acc);
      }
      return acc;
    }, component)
    ;
  },
  
  renderBlock(type, props) {
    const BlockComponent = this.registeredBlocks[type];
    if (BlockComponent) {
      return <BlockComponent {...props} />;
    }
    return null; // or a fallback component
  },
};

export default pluginRegistry;