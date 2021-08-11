/* fetch('http://localhost:3000/api/cameras')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(data => {
    const articlesContainer = document.getElementById('articles');
    for (let articles of data){
      articlesContainer.innerHTML += `
      <img src= "${articles.imageUrl}"> <br>
      <h1>${articles.name}</h1> <span>${articles.price}</span> <br>`;
    }
}); */

/* fetch('http://localhost:3000/api/cameras')
  .then(response => response.json())

  .then(data => {
    const articlesContainer = document.getElementById('articles');
    for (let articles of data) {
      articlesContainer.innerHTML += `${articles.imageURL}<br> ${articles.name} ${articles.price}<br> <p> ${articles.description}</p><br>`;
    }
  });
 */


/*
  -T'ancrer sur un élément HTML
  -faire de l'append de nouveaux elements HTML (article, image, etc)
  -Toutes les informations se trouvent dans les données reçues
  -Faire une boucle sur les données
*/

function article_gen(parent, _image="", _name="", _price="", _description=""){  
  var article = document.createElement("div");
  article.id =  "articleProduct";

    var image = document.createElement("img");
    image.id =  "image";
    image.src = _image;
    article.addChild(image);

    var descriptionProduit = document.createElement("descriptionProduit");
    descriptionProduit.id = "descriptionProduit";
    article.addChild(descriptionProduit);

      var productNamePrice = document.createElement("div");
      productNamePrice.id = "productNamePrice";
      descriptionProduit.addChild(productNamePrice); 

        var name = document.createElement("h3");
        name.id =  "name";
        name.innerHTML = _name;
        productNamePrice.addChild(name);

        var price = document.createElement("span");
        price.id =  "price";
        price.innerHTML = _price + "€"
        productNamePrice.addChild(price);
      
      var description = document.createElement("p");
      description.id =  "description";
      article.addChild(description); 

  parent.addChild(article);
}
  
function product(){
  fetch('http://localhost:3000/api/cameras')
    .then(response => response.json)
    .then(data => console.log(data))
    .then(data => {
      const articleProduct = document.getElementsByClassName('articleProduct');
      /* for (let articleProduct of data){
        articleProduct.innerHTML += `
        <img src="${articleProduct.imageUrl}"/>`
      } */
      for(let articleProduct of data){
        articleProduct.innerHTML += article_gen()
      }
        
    });
}
product();