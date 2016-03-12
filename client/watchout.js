
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


var moveEnemies = function(data) {

  var enemies = svg.selectAll('.enemies')
    .data(data);

  //existing enemies
  enemies.transition()
    .duration(750)
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
  .duration(750).each(function(enemy) {

  });
};

var currentScore = 0;
var collisions = 0;


setInterval(function() {
  moveEnemies(randomPositions(30));  
}, 1000);

setInterval(function() {
  d3.select('.current').selectAll('span').text(currentScore++);
}, 60);



var checkCollision = function() {
  var radiusSum = enemy.attr('r') + circle.attr('r');
  var xDiff = enemy.attr('cx') - circle.attr('cx');
  var yDiff = enemy.attr('cy') - circle.attr('cy');

  var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

  if (separation < radiusSum) {
    // callback(circle, enemy);
     d3.select('.collisions').selectAll('span').text(collisions++);
    //function that changes the score to zero
    //check if it is greater than highest score.
  }
};

// checkCollision = (enemy, collidedCallback) ->
//     _(players).each (player) ->
//       radiusSum =  parseFloat(enemy.attr('r')) + player.r
//       xDiff = parseFloat(enemy.attr('cx')) - player.x
//       yDiff = parseFloat(enemy.attr('cy')) - player.y

//       separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
//       collidedCallback(player, enemy) if separation < radiusSum
// ¶
// If we have a collision, just reset the score

//   onCollision = ->
//     updateBestScore()
//     gameStats.score = 0
//     updateScore()














