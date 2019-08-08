'use strict';

const path = require('path');
const url = require('url');

module.exports = (hexo,scripts) => {
  scripts = (scripts||[]).map((item) => url.resolve(hexo.config.root,item))
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
