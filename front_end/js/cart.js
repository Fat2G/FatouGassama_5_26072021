/* récupération des données du localStorage */
let addCart = JSON.parse(localStorage.getItem("camera"));
console.log(addCart);

/* creation d'une constante relié à la div ayant l'id panier */
const productCart = document.querySelector("#panier");

/* const del = localStorage.removeItem('caméra');
function deleteProduct(){
  del;  
} */

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
  let cartStructure = [];

  for (let i = 0; i < addCart.length; i++) {
    cartStructure = cartStructure + `
    <div id="cartStructure">
      <div>
        <img src="${addCart[i].img}">    
      </div>
      <div>
        <h2> ${addCart[i].name} </h2>
      </div>
      <div>
        <h2> ${addCart[i].lenses} </h2>
      </div>
      <div>
        <h2> ${addCart[i].quantity} </h2>
      </div>
      <div>
        <span> ${addCart[i].price} </span>
      </div>
      <button type="button" onclick="/"> Effacer </button>
    </div> 
    `;
  }
  productCart.innerHTML = cartStructure;
}

/*--------------- VALIDATION DU FORMULAIRE --------------*/
/* constante correspondant au bouton de confirmation de paiement */
const btnPayCart = document.querySelector('#payBtn');
console.log(btnPayCart);

btnPayCart.addEventListener('click', (e) =>{
  /* on empeche le rechargement de la page et l'envoie du formulaire */
  e.preventDefault();

  /* données du formulaire et du panier envoyées dans le local storage */
  const formValues = {    
    nom: document.querySelector('#nom').value,
    prenom: document.querySelector('#prenom').value,
    adresse: document.querySelector('#adresse').value,
    ville: document.querySelector('#ville').value,
    email: document.querySelector('#email').value
  }

  /* données du formulaire dans le localStorage */
  localStorage.setItem('formulaire', JSON.stringify(localStorage.getItem('formValues')));
 
  /* données du formulaire et des produits placées dans un objet à envoyer vers le serveur */
  const cartFormToServer = {
    addCart,
    formValues 
  }
  console.log(cartFormToServer);

  /* envoie de l'objet réunissant le formulaire et les produits du panier vers le serveur */




})

