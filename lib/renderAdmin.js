'use strict';

const path = require('path');

module.exports = function (hexo,config) {
  let scripts = config.scripts||[];
  scripts = scripts.map(function(item) {
    if (item.indexOf('http') >= 0) {
      return item;
    }
    return (hexo.config.root + item).replace(/\/{2,}/g,'/');
  })
  let renderConfig = {
    scripts:scripts
  }
  let ejsFile = path.join(__dirname, '../admin/index.ejs')
  if (hexo.render.isRenderableSync(ejsFile)) {
    return hexo.render.renderSync({ path: ejsFile }, renderConfig);
  } else {
    return hexo.render.renderSync({ path: path.join(__dirname, '../admin/index.swig') }, renderConfig);
  }
}
