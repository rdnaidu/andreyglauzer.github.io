---
layout: posts
title: Criando um servidor FTP com proFTPD
data: Outubro de 2017
background: /files/images/articles/2017/2017-10-15-criando-um-servidor-ftp-com-proftpd/banner.png
description: 'Criando um exelente sistema de transferência de arquivos com proFTPD'
tags: [FTP, Linux]
categories: 
  - FTP
---

File Transfer Protocol (*"Protocolo de Transferência de Arquivos"*), ou `FTP` , é uma forma inteligente e bem fácil para realizar transferências de arquivos, sendo uma das mais utilizadas por grandes empresas, e companhias que precisam transferir arquivos entre clientes de forma segura, além de muitos equipamentos também utilizarem desse recurso, como impressoras, relógios de ponto, etc..

Pensando nisso, vou explicar como instalar e configurar permissões de acessos em um FTP usando o `proFTPD` no `Debian 9`.

## Instalação

Vou aplicar esse tutorial utilizando um `Debian`, então qualquer sistema Linux, com base no `Debian`, deve funcionar com os comandos que vou passar, já os demais linux como `RedHat`, `OpenSUSE` etc.. Vai depender do instalador de pacotes e o sistema de serviços que ele utiliza.

Para fazer a instalação digite o comando:

```
sudo apt-get install proftpd openssl
```
 
Em um momento da instalação será solicitado o método de utilização do serviço `FTP`, selecione como `Autônomo`.

![enter image description here](/files/images/articles/2017/2017-10-15-criando-um-servidor-ftp-com-proftpd/01.PNG "01.PNG")

## Configurando o serviço

Agora vamos precisar criar os usuário(s) e o grupo(s), que vão ter acesso ao `FTP`, para isso você precisa editar o arquivo `proftpd.conf`, que fica em `/proftpd/proftpd.conf`, então digite o comando à baixo:

```
vim /proftpd/proftpd.conf
```

> Caso você não tenha o VIM instalado será necessário instalar com o comando `apt-get install vim`.
  

Com o arquivo aberto, procure por `User` e `Group`, e edite os valores, pelo usuário e grupo que deve ter acesso ao `FTP`.


> Para localizar palavras no vim, digite `:\` em seguida escreva a palavra que deseja procurar e pressione enter. O cursar será direcionado até a palavra mais próxima.
  
![enter image description here](/files/images/articles/2017/2017-10-15-criando-um-servidor-ftp-com-proftpd/02.PNG "02.PNG")

O mais importante que deve ser alterado é o grupo, porque qualquer usuário que esteja dentro do grupo que você definir, terá acesso ao `FTP`.

## Pasta do FTP

É necessário definir uma pasta onde vai ficar os arquivos do `FTP`, porque assim podemos limitar o acesso via `FTP` em apenas um diretório e não à raiz do sistema operacional.

Então no mesmo arquivo procure por `DefaultRoot`, e altere o valor para a pasta que você quiser, eu deixei como `/var/www/ftp`.

> **Lembrete**: sistemas Linux, diferencia letras maiúsculas e minúsculas.

```
# Use this to jail all users in their homes
DefaultRoot        /var/www/ftp
```

![enter image description here](/files/images/articles/2017/2017-10-15-criando-um-servidor-ftp-com-proftpd/03.PNG "03.PNG")

Agora vamos definir a porta à ser utilizada, eu vou deixar o padrão que é `21`, mas se você quiser pode colocar outra, isso vai depender muito da sua necessidade, por segurança eu recomendo você usar outra porta, caso tenha a intenção de acessar o seu `FTP` externo, porque a porta `21` já é muito manjada.

```
# Port 21 is the standard FTP port.
Port  21
```

![enter image description here](/files/images/articles/2017/2017-10-15-criando-um-servidor-ftp-com-proftpd/03.PNG "03.PNG")

Agora vamos salvar, para fazer isso digite:

```
:wq
```

Essas são as configurações básicas, caso você queria se aprofundar mais recomendo ler o [manual](https://linux.die.net/man/8/proftpd).

## Reiniciando o serviço

Para as configurações que acabamos de fazer sejam aplicadas é necessário reiniciar o serviço para isso, digite:

```
service proftpd restart
```

## Criando shell para usuários do FTP

Uma medida de segurança é não definir um shell para usuários que tenham acesso ao FTP, para isso vamos editar o arquivo `/shells`, então digite o comando:

```
vim ~./shells
```

Na ultima linha adicione `/bin/false`, deve ficar quase igual a imagem à baixo:


![enter image description here](/files/images/articles/2017/2017-10-15-criando-um-servidor-ftp-com-proftpd/04.PNG "04.PNG")

## Criando o grupo de acesso ao FTP

Agora vamos criar um grupo, que vai ter acesso ao `FTP`, com base no nome de grupo que você definiu no arquivo de configurações do `proFTPD`, digite o comando:

```
groupadd ftpgroup
```

## Criando usuários

Para criar um usuário que vai ter acesso ao `FTP`, precisamos definir o local que o mesmo vai ter acesso, o shell do mesmo e o grupo que criamos para o `FTP`, com essa base o comando deve ficar mais ou menos assim:

```
useradd usuario -s /bin/false -d /var/www/ftp -G ftpgroup
```

Com o usuário criado, precisamos definir uma senha:

```
passwd usuario
```

## Final

Após concluir esses passos, você vai ter o seu `FTP`, que pode ser acessado ou via `Browser`, `Explorer` até mesmo por `Clients` de FTP.

![enter image description here](/files/images/articles/2017/2017-10-15-criando-um-servidor-ftp-com-proftpd/05.PNG "05.PNG")

## Acessar externo

Agora para acessar o seu FTP  de outro local, é necessário fazer redirecionamento de portas em seu `Firewall` ou `Roteador`, vai depender muito do que você utiliza, mais para frente pretendo criar tutoriais explicando como fazer regras de redirecionamentos no `SonicWall`, `pfSense` e `Fortinet` que são Firewalls que eu tenho conhecimento.

\vlw