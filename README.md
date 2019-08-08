# Hexo Netlify CMS
[![](https://img.shields.io/npm/v/hexo-netlify-cms.svg?style=popout-square)](https://www.npmjs.com/package/hexo-netlify-cms)
![npm](https://img.shields.io/npm/dt/hexo-netlify-cms.svg?style=popout-square)
![npm](https://img.shields.io/npm/l/hexo-netlify-cms.svg?style=popout-square)

It's a hexo plugin for netlify-cms, so you can use it easily.   

[Live Demo](https://github.com/JiangTJ/hexo-netlify-cms-example) | [中文文档](README-ZH.md)

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
code is `<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>`  
![](imgs/snippet.png)

**Note: suggest set pegistration preferences invite only**

Now, Netlify CMS is available in path `your-site/admin`

## Advance 
Customize the auto-generate or feilds config as following:
```yml
netlify_cms:
  # auto generator
  auto_generator:
    post: 
      all_posts:
        #enabled: true
        label: "Post"
        folder: "source/_posts" # The path to the folder where the documents are stored
        create: true # Allow users to create new documents in this collection
        editor:
          preview: true
    page: 
      enabled: true
      config:
        label: "Page"
        delete: false
        editor:
          preview: true

  # Set global fields
  global_fields:
    # through hexo config over fields
    over_format: true
    default:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime", dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm:ss", format: "YYYY-MM-DD HH:mm:ss", required: false}
      - {label: "Tags", name: "tags", widget: "list", required: false}
      - {label: "Categories", name: "categories", widget: "list", required: false}
      - {label: "Body", name: "body", widget: "markdown", required: false}
      - {label: "Permalink", name: "permalink", widget: "string", required: false}
      - {label: "Comments", name: "comments", widget: "boolean", default: true, required: false}
    #post:
    #page:
```

Customize the netlify CMS configuration file path to override [the default](admin/config.yml)
```yml
netlify_cms:
  config_file: netlify.yaml
```

Add custom script support, can be used to customize component or css   
such as：    
Add [youtube.js](https://github.com/JiangTJ/hexo-netlify-cms-example/blob/master/source/js/cms/youtube.js) to your site  
Or add [img.js](https://github.com/JiangTJ/hexo-netlify-cms-example/blob/master/source/js/cms/img.js) to your site   
```yml
# need skip render
skip_render:
  - js/**
netlify_cms:
  scripts:
    - js/cms/youtube.js
    #- js/cms/img.js
    #Or use jsdelivr cdn
    #- https://cdn.jsdelivr.net/gh/JiangTJ/hexo-netlify-cms-example@0.0.1/source/js/cms/youtube.js
    #- https://cdn.jsdelivr.net/gh/JiangTJ/hexo-netlify-cms-example@0.0.1/source/js/cms/img.js
```

And other vars in `netlify_cms` can be found in [Netlify CMS](https://www.netlifycms.org/docs/configuration-options/)  

## Tips
1. Suggest enable `Netlify Large Media`, can make media loading faster。[Large Media Docs](https://www.netlify.com/docs/large-media/)

## Debug
Step 1: exce cmd as following:
```
yarn link
git clone --recursive https://github.com/JiangTJ/hexo-netlify-cms-example.git example
cd example
yarn link hexo-netlify-cms
yarn install
```

Step 2: Modify example `backend.name` to `test-repo`

Step 3: Run `hexo s`
