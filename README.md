# Hexo Netlify CMS
[![](https://img.shields.io/npm/v/hexo-netlify-cms.svg)](https://www.npmjs.com/package/hexo-netlify-cms)   

It's a plug for netlify-cms, so you can use it easily.

## How to use
### Step1: Add dependency
```bash
yarn add hexo-netlify-cms
// or npm
npm i hexo-netlify-cms --save
```
### Step2: Add config in hexo
```yaml
netlify_cms:
  backend:
    name: git-gateway
    branch: master
```
### Step3: Enable service in netlify

Enable netlify git-gateway
![](imgs/git-gateway.png)

Add netlify-identity-widget.js
![](imgs/snippet.png)

**Note: suggest set pegistration preferences invite only**

Now, Netlify CMS is available in path `your-site/admin`


## Advance
Any vars in `netlify_cms` can be found in [Netlify CMS](https://www.netlifycms.org/docs/configuration-options/)   

In addition, you can customize the netlify CMS configuration file path to override [the default](admin/config.yml)
```yml
netlify_cms:
  config_file: netlify.yaml
```
