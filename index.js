
//Muistipeli


//Määritetään kuvat muistipeliin                
let cardArray = [ 
  { name: "1", img: "fallguys.png", }, 
  { name: "1", img: "fallguys.png", },
  { name: "2", img: "index1.jpg", },
  { name: "2", img: "index1.jpg", }, 
  { name: "3", img: "fallguys5.png", },
  { name: "3", img: "fallguys5.png", }, 
  { name: "4", img: "fallguys4.png", },
  { name: "4", img: "fallguys4.png", },
  { name: "5", img: "fallguys2.png", },
  { name: "5", img: "fallguys2.png", },
  { name: "6", img: "fallguys3.png", },
  { name: "6", img: "fallguys3.png", }, 
  ]; 
  
  
  
  
  // määrittää muuttujat ja dokumenttioliomallit
  let grid = document.querySelector(".grid");
  let audio = document.querySelector("audio")
  let source = document.querySelector("#source")
  let scoreBoard = document.querySelector(".scoreBoard"); 
  let popup = document.querySelector(".popup"); 
  let playAgain = document.querySelector(".playAgain"); 
  let clickBoard = document.querySelector(".clickBoard"); 
  let resultBoard = document.querySelector(".highscoreBoard"); 
  let imgs; 
  let cardsId = []; 
  let cardsSelected = []; 
  let cardsWon = 0; 
  let clicks = 0;
  document.addEventListener("DOMContentLoaded", function () {
  

  
    
  //määrittää funktiot
  createBoard(grid, cardArray); 
  arrangeCard();
  playAgain.addEventListener("click", replay); 
  
  
  // määrittää funktiot kuville
  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach(img => 
  img.addEventListener("click", flipCard)
  ) 
  });
  
  // CreateBoard funktio
  function createBoard(grid, array) { 
  popup.style.display = "none"; 
  array.forEach((arr, index) => { 
  let img = document.createElement("img"); 
  img.setAttribute("src", "star.png");
  img.setAttribute("data-id", index); 
  grid.appendChild(img); 
  })
  }
  
  
  //järjestää kortit
  function arrangeCard() { 
  cardArray.sort(() => 0.5 - Math.random())
  }
  
  
  //kääntää kortit
  function flipCard() { 
  let selected = this.dataset.id;
    let clicked =cardArray[selected].name
  cardsSelected.push(clicked); 
    
     source.src=`${clicked}.mp3`
    audio.load()
    audio.play()
  
    
   //kääntää kortit 
  cardsId.push(selected); 
  this.classList.add("flip"); 
  this.setAttribute("src", cardArray[selected].img); 
  if (cardsId.length === 2) { 
  setTimeout(checkForMatch, 500);
  } 
  }
  
  // kertoo onko pari muodostunut
  function checkForMatch() { 
  let imgs = document.querySelectorAll("img"); 
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) { 
  
   
   
  cardsWon += 1; 
  scoreBoard.innerHTML = cardsWon; 
  setTimeout(checkWon,500) 
  } else { 
  imgs[firstCard].setAttribute("src", "star.png");
  imgs[secondCard].setAttribute("src", "star.png");
    source.src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/error.mp3"
    audio.load()
    audio.play()
    imgs[firstCard].classList.remove("flip"); imgs[secondCard].classList.remove("flip"); 
  } 
  cardsSelected = []; 
  cardsId = []; 
  clicks += 1; 
  clickBoard.innerHTML = clicks; 
  }
  //kertoo voittiko pelaaja pelin
  function checkWon() {
  if (cardsWon == cardArray.length / 2) {
  
  setTimeout(()=> popup.style.display = "flex" ,300); 
  }
  }
  
  //aloittaa pelin alusta
  function replay() { 
  arrangeCard(); 
  grid.innerHTML = "";
  createBoard(grid, cardArray);
  cardsWon = 0;
  clicks = 0; 
  clickBoard.innerHTML = 0; 
  scoreBoard.innerHTML = 0;
  highscoreBoard.innerHTML= 0; 
  popup.style.display = "none"; 
  }


