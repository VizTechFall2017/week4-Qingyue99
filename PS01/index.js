
        var RadarChart = {
            draw: function(id, d, options){
                var cfg = {
                    radius: 5,
                    w: 300,
                    h: 300,
                    factor: 1,
                    factorLegend: .85,
                    levels: 5,
                    maxValue: 0,
                    radians: 2 * Math.PI,
                    opacityArea: 0.5,
                    ToRight: 5
                };

                cfg.maxValue = 56;

                console.log(d);

                var allAxis = (d.map(function(i, j){return i.name}));
                var total = allAxis.length;
                var radius = cfg.factor*cfg.h/2;
                //var Format = d3.format('%');
                //d3.select(id).select("svg").remove();

                var g = d3.select(id)
                    .append("svg")
                    .attr("width", cfg.w + 200)
                    .attr("height", cfg.h +200)
                    .append("g")
                    .attr("transform", "translate(50,50)");


                //Text indicating at what % each level is
                for(var j=0; j<cfg.levels; j++){
                    var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
                    g.selectAll(".levels")
                        .data([1]) //dummy data
                        .enter()
                        .append("svg:text")
                        .attr("x", function(d){return cfg.w/2 + levelFactor*Math.cos(-30.0/180 * Math.PI);})
                        .attr("y", function(d){return cfg.h/2 + levelFactor*Math.sin(-30.0/180 * Math.PI);})
                        .attr("class", "legend")
                        .style("font-family", "sans-serif")
                        .style("font-size", "10px")
                        .attr('z-index', '10000')
                        .text((j+1)*100/cfg.levels);
                }

                //Circular segments
                for(var j=0; j<cfg.levels; j++){
                    var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
                    g.selectAll(".levels")
                        .data(allAxis)
                        .enter()
                        .append("svg:circle")
                        .attr("r", levelFactor)
                        .attr("cx", cfg.w/2)
                        .attr("cy", cfg.h/2)
                        .attr("class", "line")
                        .style("stroke", "grey")
                        .style('fill-opacity', 0.1/4)
                        .style("stroke-opacity", "0.75")
                        .style("stroke-width", "0.3px");
                        //.attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
                }



                series = 0;

                var axis = g.selectAll(".axis")
                    .data(allAxis)
                    .enter()
                    .append("g")
                    .attr("class", "axis");

                axis.append("line")
                    .attr("x1", cfg.w/2)
                    .attr("y1", cfg.h/2)
                    .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
                    .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
                    .attr("class", "line")
                    .style("stroke", "grey")
                    .style("stroke-width", "1px");

                axis.append("text")
                    .attr("class", "legend")
                    .text(function(d){return d})
                    .style("font-family", "sans-serif")
                    .style("font-size", "11px")
                    .attr("text-anchor", "middle")
                    .attr("dy", "1.5em")
                    .attr("transform", function(d, i){return "translate(-40, -40)"})
                    .attr("x", function(d, i){return (cfg.w/2+30)*(1-Math.cos(i*cfg.radians/total));})
                    .attr("y", function(d, i){return (cfg.h/2+30)*(1-Math.sin(i*cfg.radians/total));});


                //d.forEach(function(y, x){
                    y = d;
                    dataValues = [];
                    g.selectAll(".nodes")
                        .data(y, function(j, i){
                            dataValues.push([
                                cfg.w/2*(1-(parseFloat(Math.max(j.time, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                                cfg.h/2*(1-(parseFloat(Math.max(j.time, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                            ]);
                        });
                    dataValues.push(dataValues[0]);
                    console.log(dataValues);
                    g.selectAll(".area")
                        .data([dataValues])
                        .enter()
                        .append("polygon")
                        .attr("class", "radar-chart-serie"+series)
                        .style("stroke-width", "2px")
                        .style("stroke",  "rgb(255,255,255)")
                        .attr("points",function(d) {

                            var str="";
                            console.log(d);

                            for(var pti=0;pti<d.length;pti++){
                                str=str+d[pti][0]+","+d[pti][1]+" ";
                            }
                            return str;
                        })
                        .style("fill", "rgb(255,255,255)")
                        .style("fill-opacity", cfg.opacityArea);

                    series++;
                //});

            }
        };


