---
layout: posts
title: Instalando o pfSense do Zero
data: Julho de 2018
background: /files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/banner.png
description: 'Um passo-a-passo de como instalar o pfSense do zero, em um ambiente virtual, mas que também pode ser utilizado em uma rede real.'
tags: [Segurança, Firewall]
categories: 
  - pfSense
---

Já faz um tempo que estou querendo escrever um post sobre o `pfSense`, porque é um dos projetos que eu mais gosto, com o tempo se você tiver o costume de acompanhar esse blog, será muito visível/transparente o porque eu gosto tanto desse projeto.

O `pfSense` é uma ferramenta completa, com licença `OpenBSD`, ou seja não precisa pagar pela sua utilização, e além de ser um software gratuito, podemos considerar ele como um UTM (Unified Threat Management, _"Central Unificada de Gerenciamento de Ameaças"_), já que com o `pfSense`, podemos realizar diversas tarefas que um UTM faz.

## Mas quais sãos as vantagens?

Tem diversas vantagens em ter ele como o seu `Firewall` principal, vou listar algumas que eu acho pontuais.

1. Gratuito;
2. Pequeno e leve;
3. Fácil utilização;
4. Estável;
5. Seguro;
6. Robusto;
7. Recursos de filtragem;
8. Pacotes diversificados;
9. Tráfego dinâmico;
10. Cluster;
11. Completo.

## E quais são as desvantagens?

Até agora eu consegui fazer tudo que um UTM faz no `pfSense`, e as principais atividades de Firewall's como _SonicWall_ e _Fortinet_ fazem, eu conseguir aplicar com ele, então na minha opinião a unica desvantagem é que não temos um suporte, sendo assim caso tenha problemas com Hardware/Lógico, você tem que resolver sozinho, mas sem pânico a comunidade é grande, e no forúm sempre vai ter alguém que já passou pelo mesmo problema que você.

## Pré-Requisitos

O `pfSense` é baseado em sistemas `FreeBSD`, isso significa que ele é pequeno e utiliza poucos recursos de uma máquina, então o seu Hardware não precisa ser robusto para suportar, mas é claro que quanto mais acessos, de mais processamento ele vai precisar com isso o seu Hardware vai precisar ser melhor, então recomendo que antes de aplicar na sua rede, você pense no seu Hardware, como esse post é apenas para estudos, nós vamos utilizar uma máquina virtual, que também não vai precisar de muita coisa, com `2GB de HD`, e `512MB de ram`, já conseguimos fazer um laboratório.

## O que vamos utilizar

Antes de começar você precisa de três coisas, um computador, o [VirtualBox](https://www.virtualbox.org/) que é um software de virtualização free instalado na sua máquina, e o mais importante a [ISO do pfSense](https://www.pfsense.org/download/).

Com essas três coisas podemos prosseguir com o nosso tutorial.

## Configurando a máquina virtual

Antes de mais nada é necessário configurar a máquina virtual, então abra o seu VirtualBox e vá em `Novo` > Dê um nome para a Máquina, no caso, `PfSense` > Selecione `BSD` como Sistema Operacional e `FreeBSD 64 Bits`, como na figura à baixo:

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/01.PNG)
<br>

Os próximos passos é só prosseguir e configurar de acordo com a sua necessidade, eu vou deixar a minha com `512 de RAM` e `1 GB` de disco que é mais que suficiente.

Vamos configurar as placas de rede, para isso vá em `Configurações` > `Rede`, deixe o Adaptador 1 como `Bridge`, e em modo promíscuo `Permitir tudo`, exatamente como a figura à baixo:

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/02.PNG)
<br>

Clique em `Adaptador 2` em `Rede` mesmo, e deixe como `Rede Interna`, e em modo promíscuo `Permitir tudo`, exatamente como a figura à baixo:

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/03.PNG)
<br>

Agora vá em `Configurações` > `Armazenamento` clique no ícone de `CD`, e selecione a ISO do pfSense, a mesma que você fez Download no site oficial.

Com esses passos realizados, já temos uma máquina virtual configurada, que está pronta para ser iniciada, então vamos lá, clique em `Iniciar`, no `pfSense`.

## Instalação do Firewall

Com a máquina iniciada, ele já deve iniciar dando boot pelo CD, conforme configuramos em alguns passos à cima, então na primeira tela pressione o número 1, que se refere a opção *“Boot Multi User [Enter]”*.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/04.PNG)
<br>

Após selecionar a opção `1`, irá começar a descompactação do Kernel e será solicitado como que você deseja iniciar, espere o tempo de boot acabar para que ele inicie o processo de instalação. E selecione `99`.

Selecione a Opçao “Accept These Settings” e dê enter para prosseguir, logo selecione “Quick/Easy instll”, e enter novamente, para que possa ser iniciada a instação do Software.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/06.png)
<br>

Nesse tutorial vamos utilizar o modo `Rápido/Facíl`, então selecione ele e de enter.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/07.png)
<br>

Após concluir a instalação será necessário a customização do Kernel, mas sem pânico, o `Kernel Standard do FreeBSD`, já tem os drivers genéricos e funcionais para que tudo funcione perfeitamente no seu Firewall, então selecione a opção “*Standard*”, para prosseguimos.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/08.png)
<br>

Após a conclusão da instalação é só selecionar a opção de reboot. Não esqueça de ir no menu de dispositivos e desmarcar a ISO do pfSense para que ele não inicie novamente.

No momento do boot, pressione `F1`, e novamente pressione `1`, e aguarde o sistema carregar.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/09.PNG)
<br>

## Configuração de placa de rede do Firewall

Agora vamos precisar configurar a `VLAN` que ele vai trabalhar, ou seja, atribuir os IP’s nas placas de rede que foram instaladas na máquina. Note que ele reconheceu duas placas de rede, que foi justamente as que configuramos, que no meu caso é a `em0` & `em1`, as vezes essas siglas mudam, depende muito da sua placa de rede e de como ela foi configurada.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/10.PNG)
<br>

Digite `2` e pressione `Enter`, para que possamos configurar as placas de rede, tanto de `LAN`, como a de `WAN`.

### Em0 

> Vai receber a rede WAN, que no nosso caso de laboratório, podemos
> deixar como DHCP, mas em um ambiente empresarial, será necessário você
> colocar o IP que a provedora de internet te passou ou que você coloque
> um IP fixo.

### Em1

> Vai receber a nossa rede LAN, que você pode usar qualquer uma, tanto
> 10.0.0.0, 192.168.0.0 ou 172.16.0.0, aqui vai da sua preferência, eu vou usar a rede 10.0.0.0

<br >
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/11.PNG)
<br>

Agora vamos pressionar `1` para que possamos começar com a rede `WAN`, que deve seguir as seguintes configurações:

```
Enter an option: 2
Enter the number of the interface you wish to configure: 1
Configure IPv4 address WAN interface via DHCP? (y/n) y
Configure IPv6 address WAN interface via DHCP6? (y/n) y
Press <ENTER> to continue.
```

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/12.PNG)
<br>

Ele deve voltar para a tela inicial, onde vamos ter que repetir quase que o mesmo processo, selecionando o número `2`, só que ao invés de configurar a `WAN`, vamos configurar a `LAN`, que é `2` também.

```
Enter the number of the interface you wish to configure: 2

Enter the new LAN IPv4 address.  Press <ENTER> for none:
> 10.0.0.1
Enter the new LAN IPv4 subnet bit count (1 to 31): 
> 24
For a WAN, enter the new LAN IPv4 upstream gateway address.
For a LAN, press <ENTER> for none:
> Enter
Enter the new LAN IPv6 address.  Press <ENTER> for none:
> Enter

The IPv4 LAN address has been set to 10.0.0.1/24
You can now access the webConfigurator by opening the following URL in your web browser:
                http://10.0.0.1/

Press <ENTER> to continue.
```

## Acessando Interface WEB

Para continuarmos com o nosso tutorial temos que imaginar que estamos em uma rede totalmente diferente da que está em nossa máquina física, por tanto, se você tentar acessar o `pfSense` do seu browser, não será encontrado, para isso será preciso criar uma outra máquina virtual, colocar na mesma rede que a `LAN` dele, deixando as configurações de placa de rede assim:

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/13.PNG)
<br>

## Configurações via interface WEB

Para acessar tudo que você precisa fazer é digitar o IP de `LAN`, no seu browser, com o usuário e senha padrão que é Usuário: `admin`, Senha: `pfsense`.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/14.PNG)
<br>

Então será iniciado um `Setup`, a maioria das opções você pode clicar em `Next`, porque tudo isso pode ser alterado depois, quando você quiser, então vou mostrar aqui só as principais, nada muito chato.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/15.PNG)
<br>

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/16.PNG)
<br>

Aqui você deve colocar os servidores DNS que você utiliza, nesse exemplo coloquei o OPENDNS, mas o ideal é que você coloque o DNS de LAN da sua rede.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/17.PNG)
<br>

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/18.PNG)
<br>

E por fim, coloque uma nova senha para o usuário `admin`.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/19.PNG)
<br>

Com o `Setup` finalizado, você será redirecionado para a página inicial de administração, daqui em diante é só alegria. Pretendo criar novos tutoriais, mais pra frente, mostrando todo o poder que esse Firewall tem.

<br>
![enter image description here](/files/images/articles/2017/2017-10-27-instalando-um-pfsense-do-zero/20.PNG)
<br>

Por hoje é só galera, eu pretendo criar muitos outros ainda, mas isso vai vim com o tempo.

\Abraço 
