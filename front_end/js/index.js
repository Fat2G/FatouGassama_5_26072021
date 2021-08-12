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
    article.appendChild(image);

    var descriptionProduct = document.createElement("descriptionProduct");
    descriptionProduct.id = "descriptionProduct";
    article.appendChild(descriptionProduct);

      var productNamePrice = document.createElement("div");
      productNamePrice.id = "productNamePrice";
      descriptionProduct.appendChild(productNamePrice); 

        var name = document.createElement("h3");
        name.id =  "name";
        name.innerHTML = _name;
        productNamePrice.appendChild(name);

        var price = document.createElement("span");
        price.id =  "price";
        price.innerHTML = _price + "€"
        productNamePrice.appendChild(price);
      
      var description = document.createElement("p");
      description.id =  "description";
      description.innerHTML = _description;
      article.appendChild(description); 

  parent.appendChild(article);
}
  
/* function product(){ 
   var articleProduct = document.getElementsByClassName('articleProduct');
  //  alert("ok");
  fetch('http://localhost:3000/api/cameras')
    .then(response => response.json)
    //.then(data => console.log(data))
    .then(data => {
      for(let articles of data){
        // article_gen(articleProduct, ${articles.imageURL}, ${articles.name}, ${articles.price}, ${articles.description});        
      }        
    });
    
} */
function product(){
  var articleProduct = document.getElementById('articlesContainer');
  console.log(articleProduct + "ok");

  
  fetch('http://localhost:3000/api/cameras')
  .then(response => response.json())
  .then(data => {
    for (let article of data) {
      article_gen(articleProduct, article.imageUrl, article.name, article.price, article.description);
    }
  });
	
  
}


/* fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(data => {
    const articlesContainer = document.getElementById('articles');
    for (let articles of data) {
      articlesContainer.innerHTML += `${articles.imageURL}<br> ${articles.name} ${articles.price}<br> ${articles.description}<br>`;
    }
  }); */