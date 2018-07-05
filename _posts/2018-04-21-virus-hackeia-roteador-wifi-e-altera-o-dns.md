---
layout: posts
title: Vírus hackeia roteadores Wi-Fi e altera o DNS
data: Abril de 2018
background: /files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/dns-hijacking.jpg
description: 'Como hackers estão coletando informações pessoais alterando o seu DNS.'
tags: [DNS, Hacker]
categories: 
  - DNS
---

Existe uma variedade de cuidados que você deve tomar quando se está navegando na internet, e um dos conselhos mais importantes é, nunca coloque informações pessoais, como dados de cartão, CPF, RG entre outras informações, em sites que a URL esteja um pouco estranha, por exemplo caso acesse o `bradesco.com.br` mas a URL está b**l**adesco.com.br.

Mas só olhar a `URL` infelizmente não é o suficiente, tem casos que a URL está perfeita, o site, parece verdadeiro, pois bem meus caros contemporâneos, me parece que tem uma nova técnica brasileira circulando, e hoje vamos nos aprofundar um pouco nela.

Tudo acontece em um serviço chamado DNS (Domain Name System), ele fica responsável em converter endereços IP para nome, assim fica mais fácil encontrar sites entre outras coisas, imagine só se você tivesse que decorar o meu site, seria mais ou menos `100.102.20.10`, não me parece uma coisa àgil.


![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image002.png)


O grande problema é que qualquer um é capaz de criar o seu servidor DNS e apontar endereços para onde bem quiser, um exemplo à seguir, na sua máquina mesmo, o seu IP local é 127.0.0.1, se você for nos arquivos de hosts da sua máquina e apontar o endereço `www.bradesco.com.br` para `127.0.0.1` seu browser vai te retornar o que estiver no IP `127.0.0.1`.

 

![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image004.png)


Esse método é tão eficaz por altera o seu servidor DNS para um que ele mesmo criou e te redireciona para um site malicioso, onde é possível coletar as suas informações.

## Como ele consegue fazer isso?

Fazendo uma pesquisa encontrei diversas vulnerabilidades em rotedores/switchs da marca TP-Link, que no caso é justamente a marca onde eu identifiquei esse problema de DNS em um cliente, mas pelo o que aprece através de aplicativos que tentam descobrir a senha do WI-FI, eles simplesmente fazem um brute-force na senha do painel administrativo do roteador até encontrar a senha, uma vez encontrada o mesmo altera o DNS direto no seu roteador/switchs.

## Na prática

Bom eu alterei o DNS de propósito da minha máquina, para mostrar melhor como isso funciona. Na imagem à baixo é possível ver que, na teoriano site do Bradesco está correto, e a página parece verdadeira.


![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image006.png)

 

Analisando, logo de primeira é possível identificar que ele me deixa passar com a agencia 000 e a conta 00000 e digito 0, mas vamos prosseguir para ver até onde isso vai dar. Já na próxima página já é solicitado a senha de 4 dígitos uma página bem parecida coma verdadeira do Bradesco.

 

![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image008.png)

 
Após digitar a senha, é solicitado o cartão token, aquele que tem vários campos com números que você usa para acessar InternetBank ou sacar dinheiro de caixa eletrônico. Então aqui está o problema, ele está me solicitando todos os números e o número de referência, nenhum banco vai me solicitar esse tipo de informação.

![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image010.png)

 

Olhando a minha máquina, podemos ver o DNS que está aplicando.

 

![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image012.png)

 

Quando damos ping no endereço DNS do Bradesco, ele me retorna um endereço IP, bem parecido com o meu DNS.


![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image014.png)



Agora já com o meu DNS verdadeiro, quando dou ping no endereço do bradesco olha o IP que ele me retorna. 


![img](/files/images/articles/2018/2018-04-21-virus-hackeia-roteador-wifi-e-altera-o-dns/clip_image016.png)


Por enquanto é isso, antes de digitar suas informações, verifique a página tenha certeza que ela não tem algo de errado ou se não está como deveria ser, e por questões de dúvidas ligue na central do seu banco e pergunte se a informação que estão sendo solicitadas está correta, esse cliente que teve o seu DNS alterado teve um saque de 85mil na sua conta bancária, e após analise identificamos que o mesmo preencheu todas as informações do seu cartão.

> Lembrando que esse DNS não é meu, essa é uma informação coletada da internet.

## Como se proteger

- Sempre configure bem o seu roteador/switch, se não souber como configurar procure tutoriais na internet, com certeza alguém já fez um, ou entre em contato com um Analista ou Técnico de Informática.

- Não tente quebrar a senha do Wi-Fi com aplicativos maliciosos.

- Sempre atualize a firmware do seu roteador/switch.

- Procure sempre colocar senhas fortes, quando mais forte mais difícil de se quebrar.