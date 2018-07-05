---
layout: posts
title: Erro de instalação do SQL Express 2014
data: Maio de 2018
background: /files/images/articles/2018/2018-05-10-erro-de-instalacao-do-sql-server-express-2014/microsoft_sql_server.png
description: 'Erro ao iniciar o serviço do SQL Server Express 2014 após concluir a instalação. Erro instalação: "Falha na espera do identificador de recuperação do Mecanismo de Banco de Dados"'
tags: [Windows Server, SQL Server]
categories: 
  - SQL Server
---

Passei alguns dias, tentando resolver um problema que eu encontrei no SQL Server Express 2014, no final da instalação me deparava com um erro contendo a seguinte mensagem:

```
TÍTULO: Instalação do Microsoft SQL Server 2014
------------------------------

Ocorreu o seguinte erro:

Falha na espera do identificador de recuperação do Mecanismo de Banco de Dados. Verifique as causas prováveis no log de erros do SQL Server.

Para obter ajuda, clique em: http://go.microsoft.com/fwlink?LinkID=20476&ProdName=Microsoft%20SQL%20Server&EvtSrc=setup.rll&EvtID=50000&ProdVer=12.0.2000.8&EvtType=0xD15B4EB2%25400x4BDAF9BA%25401306%254026

------------------------------
BOTÕES:

OK
------------------------------
```

Mesmo após o OK a instalação era finalizada, porém, o serviço não iniciava, então depois de muita pesquisa descobri que o problema estava no usuário do `SQL Server Database Engine`.

A solução acabou sendo bem simples, remova toda a instalação do `SQL Server Express 2014` pelo painel de controle, reinicie o servidor e faça uma nova instalação, e no momento em que for solicitado o usuário e senha do `SQL Server Database Engine` coloque `NT AUTHORITY\NETWORK SERVICE`.

> Não use o procurar, porque você não vai encontrar esse usuário apenas cole no campo e continue com o processo de instalação.

----
Receber feedback é muito bom, comente se isso te ajudou em alguma situação.