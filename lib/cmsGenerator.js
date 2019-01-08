'use strict';

const path = require('path');
const yaml = require('js-yaml');

module.exports = function (hexo,locals,config) {
  //Auto pages
  if (config.pages.enabled) {
    let pageConfig = config.pages.config;
    //Get fields
    let pageFields = pageConfig.fields;
    if (!pageFields) {
      config.collections.forEach(element => {
        if (element.name === 'posts') {
          pageFields = element.fields;
        }
      });
    }
    //Get files from locals var
    let pageFiles = locals.pages.data.map(function (page) {
      return {
        name: page.source.replace(/\//g, '-'),
        label: page.title,
        file: path.join(hexo.config.source_dir, page.source),
        editor: {
          preview: pageConfig.editor.preview
        },
        fields: pageFields
      }
    });
    //Add pages collection
    config.collections.push({
      label: pageConfig.label,
      name: 'pages',
      delete: pageConfig.delete,
      files: pageFiles
    });
  }
  return yaml.safeDump(config);
}
