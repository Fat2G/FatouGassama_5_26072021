/* écouteur d'évènement qui fonctionne lorsque le formulaire est envoyé*/
document.getElementById('payBtn').addEventListener("submit", function(e){ 

  let erreur;

  /* recuperation de toutes les balises input */
  let inputs = document.getElementsByTagName('input');
  /* creation de boucle demandant à ce que tous les champs soient remplis */
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value){
      erreur = "Veuillez remplir tous les champs";
      break;
    }
  }

  if (erreur){
    e.preventDefault();/* empeche le rechargement de la page et l'envoie du formulaire */
    document.getElementById('erreur').innerHTML = erreur;
    return false;
  } else {
    alert("commande envoyé");
  }

})
