'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const renderAdmin = require('./lib/renderAdmin');
const cmsGenerator = require('./lib/cmsGenerator');

hexo.extend.generator.register('generateNetlifyCMS', function(locals){

  //Get config
  let hexoConfig = Object.assign({}, hexo.theme.config.netlify_cms, hexo.config.netlify_cms);
  let filePath = hexoConfig.config_file||path.join(__dirname, 'admin/config.yml');
  let yamlConfig = yaml.safeLoad(fs.readFileSync(filePath));
  Object.assign(yamlConfig,hexoConfig)

  return [{
    path: 'admin/index.html',
    data: function(){
      return renderAdmin(hexo,yamlConfig);
    }
  },{
    path: 'admin/config.yml',
    data: function(){
      return cmsGenerator(hexo,locals,yamlConfig);
    }
  }];
  
});
