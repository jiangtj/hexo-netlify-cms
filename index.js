'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

hexo.extend.generator.register('generateNetlifyCMS', function(locals){
  return [{
    path: 'admin/index.html',
    data: function(){
      return hexo.render.renderSync({path: path.join(__dirname, 'admin/index.ejs')},hexo.config);
    }
  },{
    path: 'admin/config.yml',
    data: function(){
      //Get config
      let hexoConfig = Object.assign({}, hexo.theme.config.netlify_cms, hexo.config.netlify_cms);
      let filePath = hexoConfig.config_file||path.join(__dirname, 'admin/config.yml');
      let yamlConfig = yaml.safeLoad(fs.readFileSync(filePath));
      let config = Object.assign(yamlConfig,hexoConfig)
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
        let pageFiles = locals.pages.data.map(function(page) {
          return {
            name: page.source.replace(/\//g, '-'),
            label: page.title,
            file: path.join(hexo.config.source_dir,page.source),
            editor:{
              preview: pageConfig.editor.preview
            },
            fields: pageFields
          }
        });
        //Add pages collection
        yamlConfig.collections.push({
          label: pageConfig.label,
          name: 'pages',
          delete: pageConfig.delete,
          files: pageFiles
        });
      }
      return yaml.safeDump(yamlConfig);
    }
  }];
});
