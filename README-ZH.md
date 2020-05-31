# Hexo Netlify CMS
[![](https://img.shields.io/npm/v/hexo-netlify-cms.svg?style=popout-square)](https://www.npmjs.com/package/hexo-netlify-cms)
![npm](https://img.shields.io/npm/dt/hexo-netlify-cms.svg?style=popout-square)
![npm](https://img.shields.io/npm/l/hexo-netlify-cms.svg?style=popout-square)   

这是一个Netlify CMS的Hexo插件，你可以使用它，简单的开启Netlify CMS服务.   

[Live Demo](https://github.com/JiangTJ/hexo-netlify-cms-example) | [English Docs](README.md)

## 快速开始

### Step1: 添加依赖
```bash
yarn add hexo-netlify-cms
```

`hexo s --debug`添加`--debug`选项，打开`http://localhost:400/admin/`可进行预览

### Step2: 在Netlify中开启服务

- 需要将你的**源码**push至GitHub仓库，并使用该源码项目启用netlify服务

- 需要开启netlify git-gateway服务
  ![](imgs/git-gateway.png)

**注意： 将身份认证设为仅邀请模式**

等待部署完成, 访问`${your-site}/admin/`查看与使用

## 其他配置

设置自定义配置文件，覆盖[默认的](admin/config.yml)，自定义配置文件的定义变量与hexo配置文件的`netlify_cms`变量中定义的等效
```yml
netlify_cms:
  config_file: netlify-cms.yaml
```

设置post与page自动生成器
```yml
auto_generator:
  post: 
    # 如果你有多个Post文件夹，在这里定义多个，见https://github.com/jiangtj/blog/blob/master/netlify-cms.yaml
    all_posts:
      # 设置为false，关闭默认的Post
      #enabled: true
      label: "Post"
      folder: "source/_posts"
      create: true
      editor:
        preview: true
  # Page生成配置
  page: 
    enabled: true
    config:
      label: "Page"
      # 默认禁止删除Page文件
      delete: false
      editor:
        preview: true
```

设置全局的fields
```yml
global_fields:
  # 通过hexo配置覆盖时间格式
  over_format: true
  # 默认的fields
  default:
    - {label: "Title", name: "title", widget: "string"}
    - {label: "Publish Date", name: "date", widget: "datetime", dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm:ss", format: "YYYY-MM-DD HH:mm:ss", required: false}
    - {label: "Tags", name: "tags", widget: "list", required: false}
    - {label: "Categories", name: "categories", widget: "list", required: false}
    - {label: "Body", name: "body", widget: "markdown", required: false}
    - {label: "Permalink", name: "permalink", widget: "string", required: false}
    - {label: "Comments", name: "comments", widget: "boolean", default: true, required: false}
  # 默认的post fields，如果设置，posts的fields将从这里取
  #post:
  # 默认的page fields，同理
  #page:
```

添加脚本, 用于自定义组件和预览样式   
例如：    
添加[youtube.js](https://github.com/JiangTJ/hexo-netlify-cms-example/blob/master/source/js/cms/youtube.js)至你的博客下  
或者添加[img.js](https://github.com/JiangTJ/hexo-netlify-cms-example/blob/master/source/js/cms/img.js)至你的博客下   
```yml
netlify_cms:
  scripts:
    - js/cms/youtube.js
    #- js/cms/img.js
    #或者使用 jsdelivr cdn
    #- https://cdn.jsdelivr.net/gh/JiangTJ/hexo-netlify-cms-example@0.0.1/source/js/cms/youtube.js
    #- https://cdn.jsdelivr.net/gh/JiangTJ/hexo-netlify-cms-example@0.0.1/source/js/cms/img.js
```

另外，其他的`netlify_cms`配置变量可以在[Netlify CMS](https://www.netlifycms.org/docs/configuration-options/)中找到  

## 提示
1. 建议开启`Netlify Large Media`，可以使媒体载入更快。[Large Media Docs](https://www.netlify.com/docs/large-media/)
