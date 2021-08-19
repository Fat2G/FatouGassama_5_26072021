/*
Trouver comment récupérer les paramètres passés en URL (GET)
Grâce à la récupération du paramètre "id"
Tu vas pouvoir faire un fetch sur l'API pour récupérer uniquement les informations de ce produit
Afficher les infos du produit

Faire en sorte que le bouton ajouter au panier fonctionne
Pour cela, tu dois enregistrer les données grâce à localstorage
Pour stocker tes données, tu vas devoir utiliser la sérialization

Les données à stocker : id du produit dans le panier + quantité

Si l'utilisateur modifie la quantité, il faut mettre à jour la variable dans ton localstorage et non ajouter une nouvelle ligne
*/

/*
 Fonction qui rempli la page HTML d'après les informations récupérée de l'API grâce à l'ID
*/ 
function product_gen(parent, _image="", _name="", _price="", _description="", _id="", _lenses="")
{
  let choiceProduct = document.createElement("div");
  choiceProduct.id = "choiceProduct";

    let image = document.createElement("img");
    image.id = "imageProduct";
    image.src = _image;
    choiceProduct.appendChild(image);

    let divChoice = document.createElement("div");
    choiceProduct.appendChild(divChoice);

      let choiceProductDescription = document.createElement("div");
      choiceProductDescription.id = "choiceProductDescription";
      divChoice.appendChild(choiceProductDescription);

        let title = document.createElement("h2");
        title.innerHTML = _name;
        choiceProductDescription.appendChild(title);

        let description = document.createElement("h3");
        description.innerHTML = _description;
        choiceProductDescription.appendChild(description);

        let price = document.createElement("h4");
        price.innerHTML = _price*.01+"€";
        choiceProductDescription.appendChild(price);

        let choice = document.createElement("form")
        choice.id = "choiceLenses";
        choiceProductDescription.appendChild(choice);

          let formLabel = document.createElement("label")
          formLabel.for = "camLensesChoice";
          formLabel.innerHTML = "Objectif";
          choice.appendChild(formLabel);

          let formSelect = document.createElement("select");
          formSelect.name = "cameraLenses";
          formSelect.id = "camLenses";
          choice.appendChild(formSelect);

            let option1 = document.createElement("option");
            option1.value = "choice1";
            option1.innerHTML = _lenses[0];
            formSelect.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = "choice2";
            option2.innerHTML = _lenses[1];
            formSelect.appendChild(option2);

            let option3 = document.createElement("option");
            option3.value = "choice3";
            option3.innerHTML = _lenses[2];
            formSelect.appendChild(option3);

      let choiceBtn = document.createElement("div");
      choiceBtn.id = "btnCart";
      divChoice.appendChild(choiceBtn);

        let button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "Panier";
        button.onclick = "";
        choiceBtn.appendChild(button);

  parent.appendChild(choiceProduct);
}
/* Trouver comment récupérer les paramètres passés en URL (GET)
Grâce à la récupération du paramètre "id"
*/
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id');

// Tu vas pouvoir faire un fetch sur l'API pour récupérer
/* fetch('http://localhost:3000/api/cameras/'+id)
.then(res => res.json())
.then(function(res){
  product_art(res.imageUrl, res.name, res.price, res.description, res._id);
}); */
function product_art(){
  let choiceProduct = document.getElementById('productContainer');
  console.log(choiceProduct + "ok");

  fetch('http://localhost:3000/api/cameras/'+id)
  .then(res => res.json())
  .then(function(res){
    product_gen(choiceProduct, res.imageUrl, res.name, res.price, res.description, res._id, res.lenses);
  });
}
/* Appel de la fonction product_art */
product_art();