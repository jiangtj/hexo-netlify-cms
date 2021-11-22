'use strict';

const fs = require('fs');
const path = require('path');
const { load } = require('js-yaml');
const { mergeWith } = require('lodash');
const renderAdmin = require('./lib/renderAdmin');
const cmsGenerator = require('./lib/cmsGenerator');

/**
 * Get config and scripts
 */
hexo.config.netlify_cms = hexo.config.netlify_cms || {};
let hexoConfig = hexo.config.netlify_cms;
let defaultConfig = load(fs.readFileSync(path.join(__dirname, 'admin/config.yml')));
let configFileConfig = {}
if (hexoConfig.config_file) {
  configFileConfig = load(fs.readFileSync(hexoConfig.config_file));
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
 * Inject netlify-identity-widget.js
 */
let injectContent = `
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
</script>
`;
hexo.extend.injector.register('body_end', injectContent, 'home');


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
