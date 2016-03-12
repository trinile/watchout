


var createEnemies = function(n) {
  var positions = [];

  for ( var i = 0; i < n; i++ ) {
    var x = Math.random() * 900;
    var y = Math.random() * 600;
    positions.push({"x": x, "y": y});
  }

  return positions;
};


var svg = d3.select(".board").append("svg")
  .attr({"width": 900, "height": 600} );

svg.selectAll("circle")
  .data(createEnemies(30))
  .enter().append("circle")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .attr("r", 10);

