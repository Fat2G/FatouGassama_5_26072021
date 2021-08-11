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
  })


  .then(data => console.log(data)); */


/* <p>${articles.description}</p> */

/*  for (let articles of data){
      articlesContainer.innerHTML += `<div class= "card">
      <img src= "${articles.imageUrl}"> <br>
      <h1>${articles.name}</h1> <span>${articles.price}</span> <br>      
      </div>`;
    } */


  /*
    -T'ancrer sur un élément HTML
    -faire de l'append de nouveaux elements HTML (article, image, etc)
    -Toutes les informations se trouvent dans les données reçues
    -Faire une boucle sur les données
  */

