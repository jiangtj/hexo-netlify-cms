var fs = require('hexo-fs');
var yaml = require('js-yaml');

hexo.extend.generator.register('asset', function(locals){
  return [{
    path: 'admin/index.html',
    data:  function(){
        fs.readFileSync('admin/index.html')
    }
  },{
    path: 'admin/config.yml',
    data: function(){
      var config = yaml.safeLoad(fs.readFileSync('admin/config.yml'));
      Object.assign(config, hexo.theme.config.netlify_cms, hexo.config.netlify_cms)
      return yaml.safeDump(config);
    }
  }];
});
