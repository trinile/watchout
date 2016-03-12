
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



// create the scg element
var svg = d3.select(".board").append("svg")
  .attr({"width": 900, "height": 600} ); 
 

var moveEnemies = function(data) {

  var enemies = svg.selectAll("circle")
    .data(data);



  enemies
    .transition()
    .duration(750)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) {return d.y; })
    .attr("r", 10);
//updating new elements
  enemies.enter().append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) {return d.y; })
  .attr('r', 10)
  .transition()
  .duration(750);

//   updateEnemies.exit().remove();
};

setInterval(function() {
  moveEnemies(randomPositions(30));
}, 1000);






















