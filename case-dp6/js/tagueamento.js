// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

//Retirar o _debug da chamada http da biblioteca Analytics.
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    

window.ga_debug = {trace: true};
ga('create', 'UA-12345-6', 'auto');

//Função para enviar um evento toda vez que o botão contato for pressionado. 
function sendContactEvent(){
    ga('send', {
        hitType: 'event',
        eventCategory: 'menu',
        eventAction: 'entre_em_contato',
        eventLabel: 'link_externo'
    });
}

//Função para enviar um evento toda vez que o botão download for pressionado. 
function sendDownloadEvent(){
    ga('send', {
        hitType: 'event',
        eventCategory: 'menu',
        eventAction: 'download_pdf',
        eventLabel: 'download_pdf'
    });
}

//Função para enviar o hit de evento que um botão da analise foi pressionado. 
function sendAnaliseEvent(){
    var elementCard = $(this).data();
    ga('send', {
        hitType: 'event',
        eventCategory: 'analise',
        eventAction: 'ver_mais',
        eventLabel: elementCard.id
    });
}

//Função para enviar o hit de evento que um Input do formulário de contato foi alterado. 
function sendContatoFormEvent(){
    var elementInput = this;
    ga('send', {
        hitType: 'event',
        eventCategory: 'contato',
        eventAction: elementInput.id,
        eventLabel: 'preencheu'
    });  
}

//Área de execução em escopo geral.

/*Como o arquivo tagueamento.js está em todas as páginas, o comando send simples será 
enviado através do comando abaixo. */
ga('send', 'pageview');

/*Adicionando o evento que será executado sempre que o evento click ocorrer em quem tem o ID 
contact.*/
document.getElementById('contact').addEventListener('click', sendContactEvent);

/*Adicionando o evento que será executado sempre que o evento click ocorrer em quem tem o ID 
download.*/
document.getElementById('download').addEventListener('click', sendDownloadEvent);

/*Conforme solicitado nas instruções é necessário utilizar ou o onclick no HTML ou addEventListener
via JS, dessa forma o que foi pensado foi a inserção dos eventos nos botões utilizando o solicitado
e feito manipulação dos dados via JQuery. [Imaginando que este seja um desafio como se fosse um requisito
do cliente]*/
if(document.getElementsByClassName('card').length != 0){
    let analiseButtons = document.getElementsByClassName('card');
    for(index = 0; index < analiseButtons.length; index++){
        analiseButtons[index].addEventListener("click", sendAnaliseEvent);
    }
}

//Inserção do event lister em todos os campos de Input do formulário do contato.
if(document.getElementsByClassName('contato').length != 0){
    let contatoForm = document.getElementsByClassName('contato');

    /*
        Simulando um envio de formulário em uma aplicação de produção, inserir uma callback 
        para garantir que o hit não bloqueie nenhuma funcionalidade do envio do formulário
        neste sistema, caso ocorra alguma falha com a lib.
    */
    contatoForm[0].addEventListener('submit', function(event){
        event.preventDefault();

        setTimeout(submitForm, 2000);

        var formSubmitted = false;
      
        function submitForm() {
          if (!formSubmitted) {
            formSubmitted = true;
            contatoForm[0].submit();
          }
        }
    
        ga('send', {
            hitType: 'event',
            eventCategory: 'contato',
            eventAction: 'enviado',
            eventLabel: 'enviado',
            hitCallback: submitForm
        });
    });

    //O index está sendo subtraido por 1 para que não seja inserido evento no botão "enviar".
    for(index = 0; index < contatoForm[0].length - 1; index++){
        contatoForm[0][index].addEventListener("change", sendContatoFormEvent);
    }
}

//Fim da área de execução de escopo geral.