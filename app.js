var imgArr = [];
imgArr.push(new ImageCons('bag', 'img/bag.jpg'));
imgArr.push(new ImageCons('banana', 'img/banana.jpg'));
imgArr.push(new ImageCons('bathroom', 'img/bathroom.jpg'));
imgArr.push(new ImageCons('boots', 'img/boots.jpg'));
imgArr.push(new ImageCons('breakfast', 'img/breakfast.jpg'));
imgArr.push(new ImageCons('bubblegum', 'img/bubblegum.jpg'));
imgArr.push(new ImageCons('chair', 'img/chair.jpg'));
imgArr.push(new ImageCons('cthulhu', 'img/cthulhu.jpg'));
imgArr.push(new ImageCons('dog-duck', 'img/dog-duck.jpg'));
imgArr.push(new ImageCons('dragon', 'img/dragon.jpg'));
imgArr.push(new ImageCons('pen', 'img/pen.jpg'));
imgArr.push(new ImageCons('pet-sweep', 'img/pet-sweep.jpg'));
imgArr.push(new ImageCons('scissors', 'img/scissors.jpg'));
imgArr.push(new ImageCons('shark', 'img/shark.jpg'));
imgArr.push(new ImageCons('sweep', 'img/sweep.png'));
imgArr.push(new ImageCons('tauntaun', 'img/tauntaun.jpg'));
imgArr.push(new ImageCons('unicorn', 'img/unicorn.jpg'));
imgArr.push(new ImageCons('usb', 'img/usb.gif'));
imgArr.push(new ImageCons('water-can', 'img/water-can.jpg'));
imgArr.push(new ImageCons('wine-glass', 'img/wine-glass.jpg'));

var imgOneEl = document.getElementById('imgOne');
var imgTwoEl = document.getElementById('imgTwo');
var imgThreeEl = document.getElementById('imgThree');
var imgInd = [] //Random image array indices for the three images


//Contructor function to create image objects
function ImageCons(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
}

//Random array index generator for three images
function ranArrInd(arrayLength) {
  imgInd.push(Math.floor(Math.random() * arrayLength));
  var num2 = (Math.floor(Math.random() * arrayLength));
  while (num2 === imgInd[0]) {
    num2 = (Math.floor(Math.random() * arrayLength));
  }
  imgInd.push(num2);
  var num3 = (Math.floor(Math.random() * arrayLength));
  while (num3 === imgInd[0] || num3 === imgInd[1]) {
    num3 = (Math.floor(Math.random() * arrayLength));
  }
  imgInd.push(num3);
}

//Adding img src to the three images
ranArrInd(imgArr.length);
imgOneEl.src = imgArr[imgInd[0]].path;
imgTwoEl.src = imgArr[imgInd[1]].path;
imgThreeEl.src = imgArr[imgInd[2]].path;
