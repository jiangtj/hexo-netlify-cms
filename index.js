var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');

hexo.extend.generator.register('generateNetlifyCMS', function(locals){
  return [{
    path: 'admin/index.html',
    data: function(){
      return fs.readFileSync(path.join(__dirname, 'admin/index.html'));
    }
  },{
    path: 'admin/config.yml',
    data: function(){
      var hexoConfig = Object.assign({}, hexo.theme.config.netlify_cms, hexo.config.netlify_cms);
      var filePath = hexoConfig.config_file||path.join(__dirname, 'admin/config.yml');
      var yamlConfig = yaml.safeLoad(fs.readFileSync(filePath));
      return yaml.safeDump(Object.assign(yamlConfig,hexoConfig));
    }
  }];
});
