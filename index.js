"use strict";
let svgContainer = d3.select("body")
                     .append("svg")
                     .attr("width", 1000)
                     .attr("height", 800)
let neighborhoods = svgContainer.append('g')
d3.json('./data/nygeo.json').then(function(data) {
    let projection = d3.geoAlbers()
            .scale(100000)
            .rotate([74.0060, 0])
            .center([0, 40.7128])
            .translate([500, 400]);
    let geoPath = d3.geoPath()
                    .projection(projection)
    neighborhoods.selectAll( "path" )
            .data( data.features )
            .enter()
            .append( "path" )
            .attr('fill', 'gray')
            .attr( "d", geoPath );
     d3.csv('data/data.csv').then((points) => {
             let airbnbs = svgContainer.append("g");
             airbnbs.selectAll('circle')
                .data(points)
                .enter()
                .append('circle')
                .attr("class", "dot")
                .attr("cx", (d) => {
                        return projection([d.longitude, d.latitude])[0]
                })
                .attr("cy", (d) => {
                        return projection([d.longitude, d.latitude])[1]
                })
                .attr('fill', '#00FFFF')
                .attr('r', 3)
                .on('click', function() {
                        d3.select(this)
                                .attr("opacity", 1)
                                .transition()
                                .duration(500)
                                .attr("x", 1000 * Math.round(Math.random()))
                                .attr("y", 800 * Math.round(Math.random()))
                                .attr("opacity", 0)
                                .on("end", () => {
                                        d3.select(this).remove()
                                })
                })
     })

})