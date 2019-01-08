'use strict';

const path = require('path');
const yaml = require('js-yaml');

const formatDateTime = function (field, hexo) {
  if (field.widget === 'datetime') {
    field.dateFormat = hexo.config.date_format;
    field.timeFormat = hexo.config.time_format;
    field.format = hexo.config.date_format + ' ' + hexo.config.time_format;
  }
  if (field.widget === 'date') {
    field.dateFormat = hexo.config.date_format;
    field.format = hexo.config.date_format;
  }
}

module.exports = function (hexo, locals, config) {

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

  //Auto over time format
  if (config.over_format) {
    config.collections.forEach(collection => {
      if (collection.fields) {
        collection.fields.forEach(field => {
          formatDateTime(field, hexo);
        })
      }
      if (collection.files) {
        collection.files.forEach(file => {
          file.fields.forEach(field => {
            formatDateTime(field, hexo);
          })
        })
      }
    })
  }

  return yaml.safeDump(config);
}
