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
      var config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'admin/config.yml')));
      Object.assign(config, hexo.theme.config.netlify_cms, hexo.config.netlify_cms)
      return yaml.safeDump(config);
    }
  }];
});
