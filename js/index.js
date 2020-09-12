$(function(){
    $("[data-toggle='tooltip']").tooltip();
    //Scrip para que funcione el popovers
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval: 6000
    });
    //Si se utiliza " " doble por fuera por dentro hay que utilizar ' ' o viceversa
    //Creacion de modal para btn
    $('#contactoBtn').on('show.bs.modal', function(e){
        //cuando se dispara el evento, generalmente esa ejecución del evento viene con un objeto, que engloba los datos relacionados con el evento. El objeto seria e
        console.log('El modal se esta mostrando');
        $('#contBtn').prop('disabled', true);
        $('#contBtn').removeClass('btn-info');
        $('#contBtn').addClass('btn-success');
    });
    $('#contactoBtn').on('shown.bs.modal', function(e){
        console.log('El modal se mostro');
    });
    $('#contactoBtn').on('hide.bs.modal', function(e){
        console.log('El modal se esta ocultando');
    });
    $('#contactoBtn').on('hidden.bs.modal', function(e){
        console.log('El modal se ocultó');
        $('#contBtn').prop('disabled', false);
        $('#contBtn').removeClass('btn-success');
        $('#contBtn').addClass('btn-info');
    });

});