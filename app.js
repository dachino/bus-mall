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
var imgInd = []; //Random image array indices for the three images
var voteTracker = 15; //Total amount of votes allows
var resultsTableEl = document.getElementById('results');
var mainEl = document.getElementById('main');
var ctx = document.getElementById('canvas').getContext('2d');

//Adding img src to the three images
refresh();

//Contructor function to create image objects
function ImageCons(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
}

//Random array index generator for three images
function ranArrInd(arrayLength) {
  imgInd = [];
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

//Function to increment the vote counter
function voting(event) {
  voteTracker -= 1;
  for (var i = 0; i < imgArr.length; i++) {
    if (event.target.name === imgArr[i].name) {
      imgArr[i].votes += 1;
    }
  }
  if (voteTracker > 0) {
    refresh();
  } else {
    imgOneEl.classList.add('noHover');
    imgTwoEl.classList.add('noHover');
    imgThreeEl.classList.add('noHover');
    disableVoting();
    resetButton();
    genTableResults();
    genChartResults();
  }
}

//Function to refresh the images
function refresh() {
  ranArrInd(imgArr.length);
  imgOneEl.src = imgArr[imgInd[0]].path;
  imgTwoEl.src = imgArr[imgInd[1]].path;
  imgThreeEl.src = imgArr[imgInd[2]].path;
  imgOneEl.name = imgArr[imgInd[0]].name;
  imgTwoEl.name = imgArr[imgInd[1]].name;
  imgThreeEl.name = imgArr[imgInd[2]].name;
}

//Event Listener to keep track of image clicks
imgOneEl.addEventListener('click', voting);
imgTwoEl.addEventListener('click', voting);
imgThreeEl.addEventListener('click', voting);

//Function to disable voting
function disableVoting() {
  imgOneEl.removeEventListener('click', voting);
  imgTwoEl.removeEventListener('click', voting);
  imgThreeEl.removeEventListener('click', voting);
  alert('Thank you for your participation, you are no longer needed.');
}

//Function to make a reset button
function resetButton() {
  var buttonEl = document.createElement('a');
  buttonEl.textContent = 'RESET';
  buttonEl.href = 'index.html';
  mainEl.appendChild(buttonEl);
}

//Function to generate table results
function genTableResults() {
  var trHeaderEl = document.createElement('tr');
  var thEl = [document.createElement('th'), document.createElement('th')];
  var tempSum = 0;
  thEl[0].textContent = 'Product Name';
  thEl[1].textContent = 'Vote Count';
  trHeaderEl.appendChild(thEl[0]);
  trHeaderEl.appendChild(thEl[1]);
  resultsTableEl.appendChild(trHeaderEl);
  for (var i = 0; i < imgArr.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl = [document.createElement('td'), document.createElement('td')];
    tdEl[0].textContent = imgArr[i].name;
    tdEl[1].textContent = imgArr[i].votes;
    trEl.appendChild(tdEl[0]);
    trEl.appendChild(tdEl[1]);
    resultsTableEl.appendChild(trEl);
    tempSum += imgArr[i].votes;
  }
  var trFooterEl = document.createElement('tr');
  trFooterEl.classList.add('totalVotes');
  var tdFooterEl = [document.createElement('td'), document.createElement('td')];
  tdFooterEl[0].textContent = 'Total Votes';
  tdFooterEl[1].textContent = tempSum;
  trFooterEl.appendChild(tdFooterEl[0]);
  trFooterEl.appendChild(tdFooterEl[1]);
  resultsTableEl.appendChild(trFooterEl);
}

//Function to generate chart results
function genChartResults() {
  var chartLabels = [];
  var chartValues = [];
  for (var i = 0; i < imgArr.length; i++) {
    chartLabels[i] = imgArr[i].name;
    chartValues[i] = imgArr[i].votes;
  }

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: '# of Votes',
        data: chartValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
  });
}
