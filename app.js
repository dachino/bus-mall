var imgArr = [];
var tempArr = [];
imgArr.push(new ImageObj('bag', 'img/bag.jpg'));
imgArr.push(new ImageObj('banana', 'img/banana.jpg'));
imgArr.push(new ImageObj('bathroom', 'img/bathroom.jpg'));
imgArr.push(new ImageObj('boots', 'img/boots.jpg'));
imgArr.push(new ImageObj('breakfast', 'img/breakfast.jpg'));
imgArr.push(new ImageObj('bubblegum', 'img/bubblegum.jpg'));
imgArr.push(new ImageObj('chair', 'img/chair.jpg'));
imgArr.push(new ImageObj('cthulhu', 'img/cthulhu.jpg'));
imgArr.push(new ImageObj('dog-duck', 'img/dog-duck.jpg'));
imgArr.push(new ImageObj('dragon', 'img/dragon.jpg'));
imgArr.push(new ImageObj('pen', 'img/pen.jpg'));
imgArr.push(new ImageObj('pet-sweep', 'img/pet-sweep.jpg'));
imgArr.push(new ImageObj('scissors', 'img/scissors.jpg'));
imgArr.push(new ImageObj('shark', 'img/shark.jpg'));
imgArr.push(new ImageObj('sweep', 'img/sweep.png'));
imgArr.push(new ImageObj('tauntaun', 'img/tauntaun.jpg'));
imgArr.push(new ImageObj('unicorn', 'img/unicorn.jpg'));
imgArr.push(new ImageObj('usb', 'img/usb.gif'));
imgArr.push(new ImageObj('water-can', 'img/water-can.jpg'));
imgArr.push(new ImageObj('wine-glass', 'img/wine-glass.jpg'));

var imgOneEl = document.getElementById('imgOne');
var imgTwoEl = document.getElementById('imgTwo');
var imgThreeEl = document.getElementById('imgThree');
var resetButtonEl = document.createElement('a');
var clearButtonEl = document.createElement('a');
var imgInd = []; //Random image array indices for the three images
var voteTracker = 15; //Total amount of votes allows
var resultsTableEl = document.getElementById('results');
var buttonsEl = document.getElementById('buttons');
var ctx = document.getElementById('canvas').getContext('2d');

//Function to add previous vote and view values to current
function addData() {
  if (localStorage.length > 0) {
    for (var i = 0; i < imgArr.length; i++) {
      tempArr[i] = JSON.parse(localStorage.getItem(imgArr[i].name));
      imgArr[i].views += tempArr[i].views;
      imgArr[i].votes += tempArr[i].votes;
    }
  }
}

//Task to complete during page load
refresh();      //Putting 3 random images
addData();   //Adding previous vote count and view count
console.table(tempArr);

//Contructor function to create image objects
function ImageObj(name, path) {
  this.name = name;
  this.path = path;
  this.views = 0;
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
    storeData();
    addButton();
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
  imgArr[imgInd[0]].views += 1;   //Tracking the number of times the image appears on screen
  imgArr[imgInd[1]].views += 1;
  imgArr[imgInd[2]].views += 1;
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

//Function to store vote count and view count into local storage
function storeData() {
  for (var i = 0; i < imgArr.length; i++) {
    localStorage.setItem(imgArr[i].name, JSON.stringify(imgArr[i]));
  }
}

//Function to clear local storage data
function clearLocalStorage() {
  localStorage.clear();
  alert('Votes and views have been cleared');
  location.reload();
}

//Function to make a reset and clear button
function addButton() {
  resetButtonEl.textContent = 'RESET';
  clearButtonEl.textContent = 'CLEAR';
  resetButtonEl.href = 'index.html';
  clearButtonEl.addEventListener('click', clearLocalStorage);
  buttonsEl.appendChild(resetButtonEl);
  buttonsEl.appendChild(clearButtonEl);
}

//Function to generate table results
function genTableResults() {
  var trHeaderEl = document.createElement('tr');
  var thEl = [document.createElement('th'), document.createElement('th'),
    document.createElement('th'), document.createElement('th')];
  var tempSum = 0;
  thEl[0].textContent = 'Product Name';
  thEl[1].textContent = 'View Count';
  thEl[2].textContent = 'Vote Count';
  thEl[3].textContent = '% of Votes When Viewed';
  thEl[3].id = 'thirdCol';
  trHeaderEl.appendChild(thEl[0]);
  trHeaderEl.appendChild(thEl[1]);
  trHeaderEl.appendChild(thEl[2]);
  trHeaderEl.appendChild(thEl[3]);
  resultsTableEl.appendChild(trHeaderEl);
  for (var i = 0; i < imgArr.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl = [document.createElement('td'), document.createElement('td'),
      document.createElement('td'), document.createElement('td')];
    tdEl[0].textContent = imgArr[i].name;
    tdEl[1].textContent = imgArr[i].views;
    tdEl[2].textContent = imgArr[i].votes;
    tdEl[3].textContent = parseFloat((100 * (imgArr[i].votes / imgArr[i].views)).toFixed(2));
    if (isNaN(tdEl[3].textContent)) {
      tdEl[3].textContent = 'Not Shown';
    } else {
      tdEl[3].textContent += '%';
    }
    trEl.appendChild(tdEl[0]);
    trEl.appendChild(tdEl[1]);
    trEl.appendChild(tdEl[2]);
    trEl.appendChild(tdEl[3]);
    resultsTableEl.appendChild(trEl);
    tempSum += imgArr[i].votes;
  }
  var totalVotesEl = document.createElement('p');
  totalVotesEl.textContent = 'Total Votes: ' + tempSum;
  resultsTableEl.appendChild(totalVotesEl);
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
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)'
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
