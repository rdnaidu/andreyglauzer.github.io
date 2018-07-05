---
layout: about
title: Sobre
description: Sou analista de segurança da informação, e administrador de redes.
permalink: /sobre/
---

## Quem sou eu?

Olá, eu sou o Andrey Glauzer, e eu estou em algum lugar entre o espaço&tempo. E aqui está você se perguntando do que se trata esse site, bom esse é um blog pessoal, e eu realmente não defini nenhum escopo para ele, então você vai encontrar coisas que estou estudando ou que tenho interesse, as vezes você pode até se surpreender quanto ao seu conteúdo, hoje eu trabalho como Analista de Suporte/Segurança da Informação, prevenindo invasões físicas e/ou lógicas, com o gerenciamento de servidores e Firewall’s como SonicWall, Pfsense. Sou formado em Tecnologia em Redes de Computadores e estou cursando minha pós-graduação em Segurança da informação, nessa minha jornada tirei algumas certificações como ITIL Foundation, CSIRT Foundation, Cybersecurity Foundation, Ethical Hacking Essentials, Information Security Officer, Malware Defense Specialist e Ransomware Defense Foundation.

## Histórico profissional

Sempre gostei muito de tecnologia, e desde quando ganhei o meu primeiro computador, me tornei um eterno curioso, para entender como tudo funciona, e como uma coisa como a tecnologia pode mover o mundo. Então me Formei em [Tecnologia em Redes de Computadores](http://anhanguera.com/graduacao/cursos/superior-de-tecnologia-em-redes-de-computadores.php), na faculdade [Anhanguera/Osasco](http://anhanguera.com), e hoje faço [Pós-Graduação em Segurança da Informação](https://www.go.senac.br/faculdade/site/cursos/seguranca_da_informacao) na faculdade [Senac](https://senac.br) tirei algumas certificações, como ITIL Foundation, CSIRT Foundation, Cybersecurity Foundation, Ethical Hacking Essentials, Information Security Officer, Malware Defense Specialist e Ransomware Defense, entre outras.


## E o que faço hoje?

Hoje eu sou Analista de Suporte, focado na parte de administração de servidores Windows e Linux, mas como diz o ditado, eu sou “pau pra toda obra”, por tanto eu tenho experiência em gerenciamento de redes, criação de políticas de segurança GPO e Active Directory, prevenções contra invasões Físicas/ou Lógicas.

Redes de computadores, roteadores/UbiquitiUnifi, Redes Wireless, Switchs, servidores proxy e Firewalls SonicWall/Pfsense. Virtualizações em ESXI, Hyper-v e Docker.

E o que eu não sei, aprendo rápido! :P

## Algumas das minhas habilidades

<div class="skills">
    <ul class="skills__list">
        {% for skills in site.skills %}
                <li class="skills__item">
                    <span style="fill:black;background-image: url(&quot;/files/images/skills/{{ skills.icon}}&quot;);">
                    {{ skills.name }}
                </span>
                <small>
                    {{ skills.name }}
                </small>
            </li>
        {% endfor %}
     </ul>
</div>
