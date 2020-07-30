'use strict';

const path = require('path');
const url = require('url');
const ejs = require('ejs');

module.exports = (hexo,scripts) => {
  scripts = (scripts||[]).map((item) => url.resolve(hexo.config.root,item))
  let config = { scripts }
  let file = path.join(__dirname, '../admin/index.ejs');
  return ejs.renderFile(file, config, { async: true });
}
