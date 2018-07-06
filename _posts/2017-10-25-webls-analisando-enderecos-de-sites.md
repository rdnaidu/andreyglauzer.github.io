---
layout: posts
title: Analisando diretórios de sites, http e https
data: Outubro de 2017
background: /files/images/articles/2017/2017-10-25-webls-analisando-enderecos-de-sites/banner.png
description: 'Script para analisar diretorios que um edenreço web possui'
tags: [Segurança, Python]
categories:
  - Python
---

As vezes para fazer um pentest é necessário analisar o quanto um site está acessível e quais diretórios estão públicos, para ter certeza que dados sensíveis não estejam de fácil acesso.

Então para isso resolvi criar um script em Python, bem simples que varre possíveis diretórios de qualquer site, com base em um wordlist, esse script pode ser um pouco barulhento se caso o domínio possua firewall IPS/IDS.

A sua utilização é bem simples, nada avançado e qualquer um pode instalar e utilizar, para fazer isso basta seguir os passos à baixo:

## Como executar

Faça clone do script.

```
git clone https://github.com/andreyglauzer/webls.git
```

Acesse o diretório

```
cd webls
```

Instale as dependências

```
Pip install -r requirements.txt
```

Para executar

```
webls.py -L wordlist/fast.txt -S testphp.vulnweb.com
```

O seu HELP

```
[!] Usage: ./webls.py -L [WORDLIST] -S [SITE]

[!] Usage: ./webls.py -L wordlist/wordlist.txt -S google.com

[+] Wordlist: Com mais de 25mil diretórios. Costuma demorar mais.

[+] Fast: Com apenas os diretórios mais conhecidos, resultado rápido.
```

/end
