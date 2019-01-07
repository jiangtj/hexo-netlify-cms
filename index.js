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
      yamlConfig = Object.assign(yamlConfig,hexoConfig)
      if (yamlConfig.auto_pages) {
        var pageFiles = locals.pages.data.map(function(page) {
          return {
            name: page.source.replace(/\//g, '-'),
            label: page.title,
            file: page.source,
            fields: [
              {label: 'Title', name: 'title', widget: 'string'}, 
              {label: "Publish Date", name: "date", widget: "datetime", format: "YYYY-MM-DD HH:mm:ss", required: false}, 
              {label: "Tags", name: "tags", widget: "list", required: false}, 
              {label: "Categories", name: "categories", widget: "list", required: false}, 
              {label: "Body", name: "body", widget: "markdown", required: false}, 
              {label: "Permalink", name: "permalink", widget: "string", required: false}, 
              {label: "Comments", name: "comments", widget: "boolean", default: true, required: false}
            ]
          }
        });
        yamlConfig.collections.push({
          label: 'Pages',
          name: 'pages',
          files: pageFiles
        })
      }
      return yaml.safeDump(yamlConfig);
    }
  }];
});
