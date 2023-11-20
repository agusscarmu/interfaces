let isVenom = false;
let inAttack = false;
var eddie = document.getElementById('eddie');
var miles = document.getElementById('miles');

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
        attack(eddie, miles);
    }
});
miles.addEventListener('mouseover', function() {
    if(!inAttack && isVenom){
        attack(miles, eddie);
    }
});

function attack(elemento1, elemento2) {
    elemento1.classList.add('attack');
    elemento2.classList.add('hitted');
    inAttack = true;
    setTimeout(function() {
        elemento1.classList.remove('attack');
        elemento2.classList.remove('hitted');
        inAttack = false
    }, 700);
}
