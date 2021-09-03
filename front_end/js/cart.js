/* récupération des données du localStorage */
let addCart = JSON.parse(localStorage.getItem("caméra"));
console.log(addCart);

/* creation d'une constante relié à la div ayant l'id panier */
const productCart = document.querySelector("#panier")

/* si panier vide message qui s'affiche */
if(addCart === null){
  const cartEmpty = `
  <div class="cartEmpty">
    <h3> Le panier est vide </h3>
  </div>
  `;
  productCart.innerHTML = cartEmpty;

} else {
  /* sinon lesproduits s'affichent depuis le localStorage */
  console.log("pas vide")
  let cartStructure = [];

  for (let i = 0; i < addCart.length; i++) {
    cartStructure = cartStructure + `
    <div id="cartStructure">
      <div>
        <img src="${addCart[i].img}">    
      </div>
      <div>
        <h3> ${addCart[i].name} </h3>
      </div>
      <div>
        <span> ${addCart[i].price} </span>
      </div>
    </div>
    `;
    console.log(cartStructure);
  }
  productCart.innerHTML = cartStructure;
  
  // if(i === addCart.length){
  //   /* creation de la structure html dans le panier */
  //   productCart.innerHTML = cartStructure;
  // }
}



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
