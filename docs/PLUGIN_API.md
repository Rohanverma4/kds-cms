# Plugin API Documentation

## Creating a New Plugin

To create a new plugin, follow these steps:

**Create a Plugin Directory**: Create a new file in plugins Directory. This file contains the main logic of your plugin.

## Integrating a Plugin

To integrate a plugin with the CMS, you can utilize various hooks and methods provided by the Plugin API.

### Available Plugin Hooks

- `init`: Called when the plugin is initialized.
- `beforeSave`: Called before a content item is saved.

## Available Plugin Methods

- **`getContentTypes()`**: Returns an array of content types that the plugin supports.
- **`getFields(contentType)`**: Returns an array of fields that the plugin provides for a given content type.

## Example Plugin

Here’s a simple example of a plugin that adds a custom field to a content type:

```javascript
// index.js
import { Plugin } from "@cms/plugin";

class MyCustomPlugin extends Plugin {
  init() {
    console.log("My Custom Plugin initialized");
  }
}
```

## Conclusion

This documentation serves as a guide for developers to create, configure, and integrate plugins into our CMS. If you have any questions or need further assistance, please feel free to reach out to our support team.
