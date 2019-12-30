# Hexo Netlify CMS
[![](https://img.shields.io/npm/v/hexo-netlify-cms.svg?style=popout-square)](https://www.npmjs.com/package/hexo-netlify-cms)
![npm](https://img.shields.io/npm/dt/hexo-netlify-cms.svg?style=popout-square)
![npm](https://img.shields.io/npm/l/hexo-netlify-cms.svg?style=popout-square)

It's a hexo plugin for netlify-cms, so you can use it easily.   

[Live Demo](https://github.com/JiangTJ/hexo-netlify-cms-example) | [中文文档](README-ZH.md)

## Quick start

### Step1: Adding dependencies

```bash
yarn add hexo-netlify-cms
```

`hexo s --debug` add `--debug` option, open `http://localhost:400/admin/` to preview

### Step2: Open the service in Netlify

- You need to push your **source code** to the GitHub repository and use this project to enable the netlify service.

- Enable the netlify git-gateway service
  ![](imgs/git-gateway.png)

- Add netlify-identity-widget.js, you can choose one way as follow.
  - If you use [next](https://github.com/theme-next/hexo-theme-next) or [cake](https://github.com/jiangtj/hexo-theme-cake) theme
    ```yml
    netlify_cms:
      load_identity_widget: next # cake
    ```
  - Others, you can use [hexo-inject](https://github.com/hexojs/hexo-inject)
    ```bash
    yarn add hexo-inject
    ```
    ```yml
    netlify_cms:
      load_identity_widget: hexo
    ```
  - Or you can use netlify inject
    `<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>`  
    ![](imgs/snippet.png)

**Note: set authentication to invitation only mode**

Wait for the deployment to complete, visit `${your-site}/admin/` to view and use

## Advance configuration

Set the custom configuration file, overwrite [default](admin/config.yml), the definition variable of the custom configuration file is equivalent to the one defined in the `netlify_cms` variable of the hexo configuration file.
```yml
netlify_cms:
  config_file: netlify-cms.yaml
```

Set post and page auto generator
```yml
auto_generator:
  post:
    # If you have multiple Post folders, define multiple here, see https://github.com/jiangtj/blog/blob/master/netlify-cms.yaml
    all_posts:
      # set to false, turn off the default Post
      #enabled: true
      label: "Post"
      folder: "source/_posts"
      create: true
      editor:
        preview: true
  # PageGeneration Configuration
  page: 
    enabled: true
    config:
      label: "Page"
      # By default, deleting Page files is prohibited.
      delete: false
      editor:
        preview: true
```

Set global fields
```yml
global_fields:
  # Overwrite time format by hexo configuration
  over_format: true
  # default fields
  default:
    - {label: "Title", name: "title", widget: "string"}
    - {label: "Publish Date", name: "date", widget: "datetime", dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm:ss", format: "YYYY-MM-DD HH :mm:ss", required: false}
    - {label: "Tags", name: "tags", widget: "list", required: false}
    - {label: "Categories", name: "categories", widget: "list", required: false}
    - {label: "Body", name: "body", widget: "markdown", required: false}
    - {label: "Permalink", name: "permalink", widget: "string", required: false}
    - {label: "Comments", name: "comments", widget: "boolean", default: true, required: false}
  # default post fields, if set, posts fields will be taken from here
  #post:
  # default page fields, the same reason
  #page:
```

Add scripts for custom components and preview styles

E.g:

Add [youtube.js](https://github.com/JiangTJ/hexo-netlify-cms-example/blob/master/source/js/cms/youtube.js) to your blog

Or add [img.js](https://github.com/JiangTJ/hexo-netlify-cms-example/blob/master/source/js/cms/img.js) to your blog

```yml
netlify_cms:
  scripts:
    - js/cms/youtube.js
    #- js/cms/img.js
    #或使用jsdelivr cdn
    #- https://cdn.jsdelivr.net/gh/JiangTJ/hexo-netlify-cms-example@0.0.1/source/js/cms/youtube.js
    #- https://cdn.jsdelivr.net/gh/JiangTJ/hexo-netlify-cms-example@0.0.1/source/js/cms/img.js
```

In addition, other `netlify_cms` configuration variables can be found in [Netlify CMS](https://www.netlifycms.org/docs/configuration-options/)

## Tips
1. It is recommended to enable `Netlify Large Media` to make the media load faster. [Large Media Docs](https://www.netlify.com/docs/large-media/)
