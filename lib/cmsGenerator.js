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

  let fields = config.global_fields;
  delete(config.global_fields)
  let autoGenerator = config.auto_generator;
  delete(config.auto_generator)

  config.collections = config.collections||[];

  //Add posts collection
  let posts = Object.keys(autoGenerator.post)
    .map(key => {
      let item = autoGenerator.post[key];
      return Object.assign({
        name: key,
        fields: fields.post || fields.default
      }, item)
    })
    .filter(item => item.enabled === undefined || item.enabled);
  config.collections.push(...posts);

  //Auto pages
  if (autoGenerator.page.enabled) {
    let pageConfig = autoGenerator.page.config;
    //Get files from locals var
    let pageFiles = locals.pages.data.map(function (page) {
      return {
        name: page.source.replace(/\//g, '-'),
        label: page.title,
        file: path.join(hexo.config.source_dir, page.source),
        editor: {
          preview: pageConfig.editor.preview
        },
        fields: fields.page || fields.default
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
  if (fields.over_format) {
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

  return yaml.dump(config);
}
