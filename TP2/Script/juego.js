var textarea = document.querySelector('textarea[name="comentario"]');
var divContenedor = document.querySelector('.contenido-comentario');

textarea.addEventListener("input", function() {
    console.log(textarea.clientHeight);
    
});
