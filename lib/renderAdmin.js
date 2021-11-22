'use strict';

const path = require('path');
const ejs = require('ejs');

module.exports = (hexo,scripts) => {
  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  scripts = (scripts||[]).map((item) => url_for(item))
  let config = { scripts }
  let file = path.join(__dirname, '../admin/index.ejs');
  return ejs.renderFile(file, config, { async: true });
}
