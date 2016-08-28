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

//Contructor function to create image objects
function ImageCons(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
}

//Random math generator for array indices
function ArrInd(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

imgOneEl.src = imgArr[ArrInd(imgArr.length)].path;
imgTwoEl.src = imgArr[ArrInd(imgArr.length)].path;
imgThreeEl.src = imgArr[ArrInd(imgArr.length)].path;
