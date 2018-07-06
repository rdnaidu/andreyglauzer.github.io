---
layout: posts
title: O que usuários de dóminio conseguem saber sobre o seu Active Directory
data: Junho de 2018
background: /files/images/articles/2018/2018-07-05-O-que-usuarios-de-dominio-conseguem-saber-sobre-o-seu-Active-Directory/banner.png
description: O que um Usuário Comum consegue extrair do Active Directory? Usando WMIC e DSQUERY.
tags: [Windows Server, Pentest]
categories: 
  - Windows Server
---

As vezes deixamos nossas regras de GPO e permissões perfeitas, mas mesmo assim algumas coisas acabam passando despercebidas, ou até mesmo encontramos problemas que não existe uma solução fácil ou até mesmo sem existência.

Principalmente pela a situação atual que temos no nosso mercado de trabalho, temos uma única pessoa para exercer diversas áreas de TI, sem contar a falta de preocupação que muitas delas tem com a segurança da informação.

Vou mostrar nesse post, como um usuário `padrão`, com poucas permissões, consegue obter informações valiosas do `Active Directory`. Podendo essas informações serem utilizadas para fins maliciosos inclusive para execução de scripts.

## Preparando ambiente

Para que possamos executar o WMIC não é necessário fazer nenhum tipo de instalação, já o `DSQUERY` será preciso instalar as `Ferramentas de Administração de Servidor Remoto` [RSAT](https://www.microsoft.com/pt-BR/download/details.aspx?id=45520).

### Identificando o Domain Controller

Para que possamos identificar o `Domain Controller` em que estamos logado, será necessário executar o seguinte comando:

```bash
echo %logonserver%
```

Resultado:

```bash
\\SRVLAB
```

### Listando todos os usuários do domínio

Também é possível listar todos os usuários cadastrados no AD, usando o comando:

```bash
net user /domain
```

Resultado:

```bash

A solicitação será processada em um controlador de domínio para o domínio laboratorio.local.


Contas de usuário para \\SRVLAB.laboratorio.local

-------------------------------------------------------------------------------
Administrador            andrey                   sshd
backup                   Convidado                cyg_server
diogo                    eduardohenrique          fernandamel
flavia                   gabriel                  krbtgt
marcio                   marco                    misael
paulo                    pneto                    rodrigo
root                     sousa                    squid

Comando concluído com êxito.

```

### Listando todos os servidores de domínio

Usando o `DSQUERY` conseguimos listar todos os servidores de domínio da rede.

```bash
dsquery server
```

Resultado:

```bash
"CN=SRVLAB,CN=Servers,CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=laboratorio,DC=local"
"CN=SRVLAB-2016,CN=Servers,CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=laboratorio,DC=local"
```

### Listando usuários e suas OUS

Com o `DSQUERY` também é possível coletar os usuários e suas OUS

```bash
dsquery user
```

Resultado:

```bash
"CN=krbtgt,CN=Users,DC=laboratorio,DC=local"
"CN=Convidado,OU=Suporte,DC=laboratorio,DC=local"
"CN=Administrador,CN=Users,DC=laboratorio,DC=local"
"CN=backup,OU=Suporte,DC=laboratorio,DC=local"
"CN=paulo,OU=Diretoria,DC=laboratorio,DC=local"
"CN=pneto,OU=Diretoria,DC=laboratorio,DC=local"
"CN=sousa,OU=Suporte,DC=laboratorio,DC=local"
"CN=flavia,OU=Diretoria,DC=laboratorio,DC=local"
"CN=gabriel,OU=Suporte,DC=laboratorio,DC=local"
"CN=squid,CN=Users,DC=laboratorio,DC=local"
"CN=sshd,CN=Users,DC=laboratorio,DC=local"
"CN=cyg_server,CN=Users,DC=laboratorio,DC=local"
"CN=root,CN=Users,DC=laboratorio,DC=local"
"CN=andrey,OU=Suporte,DC=laboratorio,DC=local"
"CN=diogo,OU=Suporte,DC=laboratorio,DC=local"
"CN=eduardohenrique,OU=Suporte,DC=laboratorio,DC=local"
"CN=rodrigo,OU=Suporte,DC=laboratorio,DC=local"
"CN=marcio,OU=Suporte,DC=laboratorio,DC=local"
"CN=fernandamel,OU=Suporte,DC=laboratorio,DC=local"
"CN=marco,OU=Suporte,DC=laboratorio,DC=local"
"CN=misael,OU=Suporte,DC=laboratorio,DC=local"
```

### Listando dados específicos do AD

Para que possamos listar dados específicos do AD, como nome completo, login, e-mail, etc...

```bash
dsquery user | dsget user -samid -display -tel -email -pwdneverexpires
```

Resultado:

```bash
  samid              display              tel    email    pwdneverexpires
  krbtgt                                                  no
  Convidado                                               yes
  Administrador                                           yes
  backup             backup                               yes
  paulo              paulo                                yes
  pneto              pneto                                yes
  sousa              sousa                                yes
  flavia             flavia                               yes
  gabriel            gabriel                              yes
  squid              squid                                yes
  sshd                                                    no
  cyg_server         Privileged server                    yes
  root               root                                 yes
  andrey             andrey                               yes
  diogo              diogo                                yes
  eduardohenrique    eduardohenrique                      yes
  rodrigo            rodrigo                              yes
  marcio             marcio                               yes
  fernandamel        fernandamel                          yes
  marco              marco                                yes
  misael             misael                               yes
dsget Com êxito
```

> Por padrão é possível receber informações de até 100 usuários, mas é da para obter mais resultando informando a quantidade que deseja:

```bash
dsquery user -limit 300 | dsget user -samid -display -tel -email -pwdneverexpires
```

### Listando usuários desabilitados

E continuando na jornada de coletar informações, também conseguimos listar usuários desabilitados.

````bash
dsquery user “dc=laboratorio,dc=local” -disabled
````

Resultado:

````bash
"CN=krbtgt,CN=Users,DC=laboratorio,DC=local"
"CN=Convidado,OU=Suporte,DC=laboratorio,DC=local"
"CN=squid,CN=Users,DC=laboratorio,DC=local"
"CN=sshd,CN=Users,DC=laboratorio,DC=local"
"CN=cyg_server,CN=Users,DC=laboratorio,DC=local"
````

### Listando todos os computadores já registrados no domínio

Com a utilização do `WMIC` também é possível obter uma lista de todos os computadores registrados no domínio.

````bash
wmic /NAMESPACE:\\root\directory\ldap PATH ds_computer GET ds_samaccountname
````

Resultado:

````bash
DS_sAMAccountName
SRVLAB-2016$
SRVLAB$
TKD-PC$
SUPORTENET6$
ALENOTE$
SUPORTE206-PC$
SUPORTE205-PC$
PAULO$
SUP-REMOTO2$
BIND-PC$
SRVHYPER-V$
FLAVIA$
PNETO$
SUPORTE201-PC$
FINANC$
SUPORTE202-PC$
NOTEFLA$
NOTEPAULO$
SUPORTE203$
SUPORTE202$
SUPORTE201$
SUPORTE-201$
SUPORTE204$
FERNANDA$
NOTESUP200$
SUPORTE-203$
SUPORTE-202$
SUPORTE999$
DESKTOP-200$
SUPORTE200$
````

### Grupos criado no Active Directory

Para listar todos os grupos existentes no Active Directory

````
wmic /NAMESPACE:\\root\directory\ldap PATH ds_group GET ds_samaccountname
````

Resultado:

````
DS_sAMAccountName
Operadores de configuração de rede
Usuários de monitor de desempenho
Usuários de log de desempenho
Distributed COM - Usuários
Operadores criptográficos
Leitores de log de eventos
Certificate Service DCOM Access
Computadores do domínio
Editores de certificados
Usuários do domínio
Convidados domínio
Servidores RAS e IAS
Criadores de confiança de floresta de entrada
Servidores de licenças do Terminal Server
Grupo de Replicação de Senha RODC Permitido
Controladores de Domínio de Empresa Somente Leitura
IIS_IUSRS
Opers. de contas
Operadores de cópia
Duplicadores
Opers. de impressão
Opers. de servidores
Controladores de Domínio Somente Leitura
Controladores de domínio
Convidados
Administradores
Proprietários criadores de diretiva de grupo
Administradores de esquema
Administradores de empresa
Grupo de acesso de autorização Windows
Grupo de Replicação de Senha RODC Negado
Usuários
Admins. do domínio
Acesso compatível anterior ao Windows 2000
Usuários da área de trabalho remota
DnsAdmins
DnsUpdateProxy
Usuários DHCP
Administradores DHCP
SQLServerMSSQLServerADHelperUser$SERVIDOR
SQLServer2005SQLBrowserUser$SERVIDOR
SQLServer2005MSSQLUser$SERVIDOR$MICROSOFT##SSEE
SQLServer2005MSFTEUser$SERVIDOR$MICROSOFT##SSEE
Informadores WSUS
Administradores WSUS
ePO User Group
bindsc
diretoria
Openfire
financ
imagens
RDS Remote Access Servers
RDS Endpoint Servers
RDS Management Servers
Administradores do Hyper-V
Controladores de Domínio Clonáveis
Operadores de Assistência a Controle de Acesso
Usuários de Gerenciamento Remoto
Protected Users
````

### Listar grupos que um usuário pertence

Também é possível coletar os grupos que um usuário pertence

````bash
dsquery user -samid andrey | dsget user -memberof | dsget group -samid
````

Resultado:

````bash
  samid
  Openfire
  Administradores
  Usuários do domínio
dsget Com êxito
````

### Exportar atributos de todos os usuários

Para exportar os atributos com informações precisas e valiosas faça o seguinte

```bash
dsquery * -limit 0 -filter “&(objectClass=User)(objectCategory=Person)” -attr *
```

Resultado:

````
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: user
cn: krbtgt
description: Conta de serviço do centro de distribuição de chaves
distinguishedName: CN=krbtgt,CN=Users,DC=bind,DC=com,DC=br
instanceType: 4
whenCreated: 12/11/2010 09:59:52
whenChanged: 05/29/2015 20:19:55
uSNCreated: 8063
memberOf: CN=Grupo de Replicação de Senha RODC Negado,CN=Users,DC=laboratorio,DC=local
uSNChanged: 12294
showInAdvancedViewOnly: TRUE
name: krbtgt
objectGUID: {F60A9851-66B2-4747-9434-EAFF1040769E}
userAccountControl: 514
codePage: 0
countryCode: 0
pwdLastSet: 129365351926816407
primaryGroupID: 513
objectSid: S-1-5-21-790824453-2479925881-3353036194-502
adminCount: 1
accountExpires: 9223372036854775807
sAMAccountName: krbtgt
sAMAccountType: 805306368
servicePrincipalName: kadmin/changepw
objectCategory: CN=Person,CN=Schema,CN=Configuration,DC=bind,DC=com,DC=br
isCriticalSystemObject: TRUE
dSCorePropagationData: 12/28/2016 12:54:07
dSCorePropagationData: 01/01/1601 00:00:00
msDS-SupportedEncryptionTypes: 0
ADsPath: LDAP://srvlab.laboratorio.local/CN=krbtgt,CN=Users,DC=bind,DC=com,DC=br
````

## Dicas

Existem algumas maneiras, de evitar que usuários comuns tenha informações valiosas da sua rede:

- Sempre faça auditoria de seus servidores
- Certifique-se que todos os usuários do domínio tenham apenas ferramentas necessárias
- Crie boas políticas de GPO evitando assim que o usuário tenha a liberdade de obter ferramentas ou coletar dados
