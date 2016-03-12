
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
  .duration(750);
};

setInterval(function() {
  moveEnemies(randomPositions(30));
}, 1000);






















