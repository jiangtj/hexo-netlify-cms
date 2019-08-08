'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const merge = require('lodash/merge');
const renderAdmin = require('./lib/renderAdmin');
const cmsGenerator = require('./lib/cmsGenerator');

hexo.extend.generator.register('generateNetlifyCMS', (locals) => {

  let hexoConfig = hexo.config.netlify_cms || {};
  let defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'admin/config.yml')));
  let configFileConfig = {}
  if (hexoConfig.config_file) {
    configFileConfig = yaml.safeLoad(fs.readFileSync(hexoConfig.config_file));
    delete (hexoConfig.config_file);
  }


  let fields = Object.assign({},
    hexoConfig.global_fields,
    configFileConfig.global_fields,
    defaultConfig.global_fields
  );

  delete (hexoConfig.global_fields);
  delete (configFileConfig.global_fields);
  delete (defaultConfig.global_fields);

  let config = merge({}, defaultConfig, configFileConfig, hexoConfig);

  let scripts = config.scripts;
  delete (config.scripts);

  return [{
    path: 'admin/index.html',
    data: function () {
      return renderAdmin(hexo, scripts);
    }
  }, {
    path: 'admin/config.yml',
    data: function () {
      return cmsGenerator(hexo, locals, config, fields);
    }
  }];

});
