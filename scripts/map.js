var width = 700, height = 400;
var colorScale = d3.scaleThreshold()
  .domain([0.5, 1, 1.5 , 2,3, 4, 5, 5.5])
  .range(d3.schemeReds[7]);


    var svg = d3.select("#mapContainer").append("svg")
            .attr("viewBox", "0 0 " + (width) + " " + (height))
            .style("max-width", "700px", "Transform: scaleX(-1)")

			

    d3.json("./data/uk.json", function (error, mapData) {
        var features = mapData.features;
		
        var projection = d3.geoIdentity()
  .fitSize([width,height],mapData);
		
		svg.append("g")
    .selectAll("path")
    .data(features)
    .enter()
    .append("path")
      // draw each region
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.difference = d.properties.newTemp - d.properties.oldTemp
        console.log(d.properties.geo_region)
        console.log(d.properties.oldTemp)
        console.log(d.properties.newTemp)
        console.log(d.difference)
        return colorScale(d.difference);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "region" } )
      .style("opacity", .8)
    });


 