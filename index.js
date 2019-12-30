'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {mergeWith} = require('lodash');
const renderAdmin = require('./lib/renderAdmin');
const cmsGenerator = require('./lib/cmsGenerator');

/**
 * Get config and scripts
 */
let hexoConfig = hexo.config.netlify_cms || {};
let defaultConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'admin/config.yml')));
let configFileConfig = {}
if (hexoConfig.config_file) {
  configFileConfig = yaml.safeLoad(fs.readFileSync(hexoConfig.config_file));
  delete (hexoConfig.config_file);
}
let config = mergeWith({}, defaultConfig, configFileConfig, hexoConfig, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
});
let scripts = config.scripts;
delete (config.scripts);

/**
 * Generate NetlifyCMS index.html and config.yml
 */
hexo.extend.generator.register('generateNetlifyCMS', (locals) => {
  if (hexo.env.debug) {
    config.backend.name = 'test-repo';
  }
  return [{
    path: 'admin/index.html',
    data: function () {
      return renderAdmin(hexo, scripts);
    }
  }, {
    path: 'admin/config.yml',
    data: function () {
      return cmsGenerator(hexo, locals, config);
    }
  }];
});
