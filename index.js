'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const merge = require('lodash/merge');
const renderAdmin = require('./lib/renderAdmin');
const cmsGenerator = require('./lib/cmsGenerator');

hexo.extend.generator.register('generateNetlifyCMS', function(locals){

  let hexoConfig = merge({}, hexo.theme.config.netlify_cms, hexo.config.netlify_cms);
  let defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'admin/config.yml')));
  let configFileConfig = {}
  if (hexoConfig.config_file) {
    configFileConfig = yaml.safeLoad(fs.readFileSync(hexoConfig.config_file));
    delete(hexoConfig.config_file);
  }

  let config = merge(defaultConfig, configFileConfig, hexoConfig);

  let scripts = config.scripts;
  delete(config.scripts);

  return [{
    path: 'admin/index.html',
    data: function(){
      return renderAdmin(hexo, scripts);
    }
  },{
    path: 'admin/config.yml',
    data: function(){
      return cmsGenerator(hexo,locals,config);
    }
  }];
  
});
