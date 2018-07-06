---
title: Bruteforce para listar subdomínios com Python
layout: posts
background: "/files/images/articles/2017/2017-11-11-bruteforce-para-listar-subdominios-com-python/banner.jpg"
categories: BruteForce
description: Fazendo um bruteforce com Python, para buscar subdomínios.
---

Fala galera, já não é novidade pra ninguém o quanto eu gosto de Python, eu sempre procuro aprender coisas novas, inclusive desenvolver scripts que uso no meu dia-a-dia com python, porque é uma delícia de linguagem.

Com o tempo, caso venha acompanhar esse blog, você também vai se apaixonar por essa linguagem, e a quantidade de coisas fantásticas e praticidade que ela te proporciona.

Bom, vamos deixar de conversa e ir ao que interessa ?

## Bruteforce

Ataques de `Bruteforce` consistem em uma busca exaustiva até encontrar o que queremos, boa parte desses ataques são com base em uma `Wordlist`, que é um documento com vários nomes possíveis de acordo com o que você esteja procurando.

Uma maneira simples para melhor entendimento é pensarmos da seguinte maneira, supondo que temos um site que exige autenticação, o usuário é root e a senha é toor, mas não sabemos a senha, então vamos ficar tentando até acertar, parece exaustivo certo? Mas podemos automatizar isso com scripts, então criamos uma wordlist com possíveis senhas.

```
root
admin
1234
0987
qazx
toor
```

O script vai passar linha por linha, tentando essas senhas que colocamos, e como a nossa senha é toor, ele deve nos retornar dizendo que a senha correta.

> **Alerta**: esse é um método extremamente barulhento, no caso de empresas que possuem Firewall UTM/IPS, vai deixar um log gigante de tanta requisição que você fez, portanto **CUIDADO**!

## Como o script funciona

O script em si é muito simples, não me deu trabalho, fiquei mais tempo tratando erros que poderiam acontecer durante a execução do script que desenvolvendo.

Explicação bem rápida de como tudo vai funcionar. Boralá.


Nessa parte do script, eu estou abrindo a wordlist que eu defini, e lendo linha por linha, ou seja um à um, e coloquei uma tratativa simples de erro, que se caso não for encontrado o arquivo, ou ele seja de uma extensão que não foi possível a leitora, vai te avisar.

```
try:
	arquivo = open(args.wordlist)
	linhas = arquivo.read().splitlines()
except:
	print('[ERROR] - A Wordlist não foi encontrada ou é inválida.')
	sys.exit(1)
```

Já neste for, eu pego as linhas que eu li na primeira parte do script, e faço uma tratativa, juntando o domínio que eu digitei com o subdomínio da wordlist.

Exemplo: `subdominio.exemplo.com.br`

E depois jogo esse resultado em um `def` que se chama resolve, onde ele vai verificar um por um.

```
for linha in linhas:
        subdominio = '{}.{}'.format(linha, args.dominio)
        resolve(subdominio)
```

Com todas as informações tratadas, agora eu vou resolver esses DNS, trazendo comigo o seu IP.

```
def resolve(subdominio):
    try:
        respostas = dns.resolver.query(subdominio, 'a')
        for resultado in respostas:
            finalizou = """{}
						[SITE]  -   {}
						[IP]    -   {}
            {}""".format(fg(198),subdominio,resultado,attr(0))
            print (finalizou)
```

## Como usar

Deixando de lado toda essa parte explicativa, vamos à utilização, antes de mais nada você precisa baixar o script, então segue os comando.

```
git clone https://github.com/andreyglauzer/dnsls.git

cd dnsls

pip3 install -r requeriments.txt

python3 dnsls.py -d exemple.com -l wordlist.txt
```

```
usage: dnsls.py [-h] [-d DOMINIO] [-l WORDLIST]

optional arguments:
  -h, --help            show this help message and exit
  -d DOMINIO, --dominio DOMINIO
                        Domínio que você deseja fazer um bruteforce.
  -l WORDLIST, --lista WORDLIST
                        Wordlist que você deseja usar.
```


E por favor não se esqueça do alerta que eu citei lá em cima!

Então é isso ai, até o próximo!
