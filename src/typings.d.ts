/* SystemJS module definition */
declare var module: {
  id: string;
  packages:
    {
      'ng2-tag-input': {
        main: 'node_modules/ng2-tag-input/dist/ng2-tag-input.bundle.js',
        format: 'cjs',
      },
      'ng2-material-dropdown': {
        defaultExtension: 'js',
        main: 'dist/ng2-dropdown.bundle.js',
        format: 'cjs',
      },
      'ng2-tag-input/modules/components/tag-input.template.html': {
        defaultJSExtension: false
      }
      // rest of the configuration
    };
};
