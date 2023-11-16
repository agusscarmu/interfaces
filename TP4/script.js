
"use strict";



document.addEventListener("DOMContentLoaded", function() {

  var gwen2 = document.getElementById("g2");
  var miles2 = document.getElementById("m2");
  var peter2 = document.getElementById("p2");

  var backGroungGwen = document.getElementById("bgwen");
  var backGroungMiles = document.getElementById("bmiles");
  var backGroungPeter = document.getElementById("bpeter");
  var backGroundWhite = document.getElementById("bwhite");

  // Agrega un listener para el evento de clic
  peter2.addEventListener("click", function() {
    if(peter2.classList.contains("clicked")) {
      removeClicked();
      return;
    }
      backGroundWhite.classList.add("over");
      peter2.classList.remove("blur");
      peter2.classList.add("clicked");
      gwen2.classList.remove("clicked");
      miles2.classList.remove("clicked");
      
      gwen2.classList.add("blur");
      miles2.classList.add("blur");

      backGroungGwen.classList.add("hidden");
      backGroungMiles.classList.add("hidden");
      backGroungPeter.classList.remove("hidden");
  });

  miles2.addEventListener("click", function() {
    if(miles2.classList.contains("clicked")) {
      removeClicked();
      return;
    }
      backGroundWhite.classList.add("over");
      miles2.classList.remove("blur");
      miles2.classList.add("clicked");
      gwen2.classList.remove("clicked");
      peter2.classList.remove("clicked");
      
      gwen2.classList.add("blur");
      peter2.classList.add("blur");

      backGroungPeter.classList.add("hidden");
      backGroungGwen.classList.add("hidden");
      backGroungMiles.classList.remove("hidden");
  });

  gwen2.addEventListener("click", function() {
    if(gwen2.classList.contains("clicked")) {
      removeClicked();
      return;
    }
      backGroundWhite.classList.add("over");
      gwen2.classList.remove("blur");
      gwen2.classList.add("clicked");
      peter2.classList.remove("clicked");
      miles2.classList.remove("clicked");
      
      peter2.classList.add("blur");
      miles2.classList.add("blur");

      backGroungMiles.classList.add("hidden");
      backGroungPeter.classList.add("hidden");
      backGroungGwen.classList.remove("hidden");
  });


  function removeClicked() {
      gwen2.classList.remove("clicked");
      miles2.classList.remove("clicked");
      peter2.classList.remove("clicked");

      gwen2.classList.remove("blur");
      miles2.classList.remove("blur");
      peter2.classList.remove("blur");

      backGroungGwen.classList.add("hidden");
      backGroungMiles.classList.add("hidden");
      backGroungPeter.classList.add("hidden");

      backGroundWhite.classList.remove("over");
  }
});