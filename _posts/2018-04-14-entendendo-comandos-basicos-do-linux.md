---
layout: posts
title: Entendendo comandos básicos do Linux
data: Abril de 2018
background: /files/images/articles/2018/2018-04-14-entendendo-comandos-basicos-do-linux/CH932.png
description: 'Os comandos são básicos, mas são de extrema importância para um administrador.'
tags: [BASH, Linux]
categories: 
  - BASH
---

Como já dizia a minha mãe "ninguém nasce sabendo", portanto, começar das coisas básicas é a base para entender as coisas grandes. Entrei em uma nova jornada, onde pretendo tirar minhas certificações Linux de vez, já faz um tempo que estou observando o mercado de trabalho e está se tornando cada vez mais importante a comprovação do seu conhecimento através de certificações.

E para fixar na cabeça, pretendo me aprofundar mais em cada assunto que estou aprendendo, então hoje vou começar por comandos básicos, mas muito básicos em um sistema Linux, porém muito utilizados no dia-a-dia de um administrador de servidores, parece brincadeira, mas é pura verdade.
Os comandos que vou falar são: `pwd, cd e ls`. É isso mesmo, esses comandos bem fajutos, mas eu gostaria de me aprofundar mais em cada um deles.

## Comando pwd

Começando pelo o comando `pwd`, ele é o responsável para você se encontrar, basicamente o seu GPS, com ele é possível saber exatamente o local onde você está. Mas como assim? Simples, vamos na premissa que você tenha que encontrar um arquivo no seu servidor Linux, logo será necessário entrar em vários diretórios e subdiretórios, então finalmente é encontrado o arquivo, só que ai o seu chefe vai e te pergunta, `qual o caminho absoluto do arquivo, Andrey?`. Ai que nosso amigo `pwd` entra, digitando ele logo o mesmo vai retorna o caminho absoluto onde você está.

```
~# pwd
/var/lib/colord/icc
```

> **Lembrete**:  o `#` é só para saber que se trata de um comando, não precisa usar ele na hora de digitar o comando no seu Bash.

## Comando cd

Já o comando cd é utilizado para entrar em diretórios. Quando se entra em um sistema Linux, você já cai direto no diretório home, do seu usuário, então para que você explore os demais arquivos existentes em seu sistema operacional é necessário navegar entre eles, vamos imaginar que tenha uma pasta chamada músicas dentro do diretório home, se for digitado cd músicas, você vai entrar na pasta andrey, e se for digitado o `pwd` o resultado será `/home/andrey/músicas/`.

```
~# cd músicas
~# pwd
/home/andrey/músicas/
```

Aguenta aí que a gente ainda não acabou, estou escrevendo bastante porque quero deixar o mais claro possível cada um desses comandos.

## Comando ls

E por fim o comando `ls`, esse aí lista tudo que tem dentro de um diretório, ou seja, se você estiver dentro de uma pasta e tiver dúvida sobre o conteúdo dela, digitando `ls`, será exibido para você tudo que está dentro dela, esse comando ls, existe alguns complementos, que é para melhorar o nosso resultado, como por exemplo o `ls -a` que exibi também os arquivos considerado ocultos no Linux. Para saber todos os complementos do comando ls digite `ls --help`, então será exibido tudo que ele pode fazer. Lembrando que usar o `--help` em qualquer cum dos outros comandos funciona, e a função é a mesma.

```
~# ls -a
.  ..  .bashrc  .profile
```

Por hoje é apenas isso, espero que tenha ajudado você à entender melhor cada um desses comandos.