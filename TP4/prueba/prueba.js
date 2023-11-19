let isVenom = false;
let inAttack = false;
var eddie = document.getElementById('eddie');
eddie.addEventListener('mouseover', function(){
    if(!isVenom){
        eddie.classList.add('transform');
    }
    setTimeout(function(){
        eddie.classList.add('venom');
        eddie.style.backgroundPosition = '-1772px -254px';
        eddie.style.width = '65px';
        },600);
    setTimeout(function(){
        isVenom = true;},1000);
})

eddie.addEventListener('mouseover', function() {
    if(!inAttack && isVenom){
        attackVenom(eddie);
    }
});

function attackVenom(elemento) {
    elemento.classList.add('attack');
    inAttack = true;
    setTimeout(function() {
        elemento.classList.remove('attack');
        inAttack = false
    }, 700);
}
