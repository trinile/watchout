
//create enemies in random positions


var randomPositions = function(n) {
  var positions = [];

  for ( var i = 0; i < n; i++ ) {
    var x = Math.random() * 900;
    var y = Math.random() * 600;
    positions.push({"x": x, "y": y});
  }

  return positions;
};



// create the svg element
var svg = d3.select(".board").append("svg")
  .attr({"width": 900, "height": 600} ); 
 
// create drag event 
var drag = d3.behavior.drag()  
 
 .on('drag', function() { circle.attr('cx', d3.event.x)
 .attr('cy', d3.event.y); });

 // create player
var circle = svg.selectAll(('.player'))
  .data([{ x: 450, y: 300}])
  .enter()
  .append('svg:circle')
  .attr('class', 'player')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 10)
  .call(drag)
  .style('fill', 'orange');

var currentScore = 0;
var collisions = 0;
var highScore = 0;

var onCollision = function() {

  highScore = currentScore > highScore ? currentScore : highScore;
  d3.select('.highscore').selectAll('span').text(highScore);

  collisions++;
  currentScore = 0;
  d3.select('.collisions').selectAll('span').text(collisions);
  d3.select('.current').selectAll('span').text(0);
  // if (d3.select('.highscore').selectAll('span').text() < currentScore);
};

var checkCollision = function(enemy) {
  // var enemy = d3.select(this);
  var radiusSum = +enemy.attr('r') + +circle.attr('r');

  var xDiff = Number(enemy.attr('cx'))- Number(circle.attr('cx'));
  var yDiff = Number(enemy.attr('cy')) - Number(circle.attr('cy'));
  var separation = Math.sqrt((Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));
  
  if (separation < radiusSum) {
    // callback(circle, enemy);
    onCollision();
    //function that changes the score to zero
    //check if it is greater than highest score.
  }
};

var moveEnemies = function(data) {

  var enemies = svg.selectAll('.enemies')
    .data(data);

  //existing enemies
  enemies.transition()
    .duration(750)
    .tween('custom', function() { 
      var enemy = d3.select(this);
      return function(t) { 
        checkCollision(enemy);
      };
    })
    // .tween('custom', checkCollision)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) {return d.y; })
    .attr("r", 10);

  //updating new elements
  enemies.enter().append('svg:circle')
  .attr('class', 'enemies')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) {return d.y; })
  .attr('r', 10)
  .transition()
  // .tween('custom', function() { 
  //   console.log(this);
  //   console.log('start'); 
  //   return function(t) { 
  //     console.log('inbetween');
  //   }; 
  // })
  .duration(750);
};

setInterval(function() {
  moveEnemies(randomPositions(10));  
}, 1000);

setInterval(function() {
  currentScore++;
  d3.select('.current').selectAll('span').text(currentScore);
}, 100);

setInterval(function() {
  var player = svg.selectAll('.player');
  // svg.selectAll('.enemies').transition().duration(750).tween('custom', checkCollision);
}, 5000);
















