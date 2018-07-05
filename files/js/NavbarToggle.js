var openNave = document.querySelector('nav.Navbar');
var BotaoNav = document.querySelector('button#menumobile');
BotaoNav.addEventListener('click', function() {
    var aberto = openNave.classList.contains('Navbar--open');
    openNave.classList.toggle('Navbar--open');
});

var menu = document.querySelector('button#menumobile');
var botao = document.querySelector('button#menumobile');
botao.addEventListener('click', function() {
    var aberto = menu.classList.contains('NavbarToggle--open');
    menu.classList.toggle('NavbarToggle--open');
});

var teste = document.querySelector('nav#searchbuttom');
var SearchNav = document.querySelector('a#header-search-button');
SearchNav.addEventListener('click', function() {
    var aberto = teste.classList.contains('Search--open');
    teste.classList.toggle('Search--open');
});
