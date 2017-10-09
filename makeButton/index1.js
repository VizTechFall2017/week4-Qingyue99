var svg = d3.select('svg')
    .append("g")
    .attr('transform',"translate(100,100)");

/* Your code goes here */

d3.csv('./data.csv', function(dataIn) {

    console.log(dataIn);
    svg.selectAll('circle')
        .data(dataIn)
        .enter()
        .append('circle')
        .attr('cx', function(d){
            return scaleX(d.x)
        })
        .attr('cy', function(d){
            return scaleY (d.y);
            })
        .attr('r',function(d){
            return d.r;
        })


    svg.append('g')
        .attr('transform', 'translate(0,400)')
        .call(d3.axisBottom(scaleX));

    svg.append('g')
        .call(d3.axisLeft(scaleY));

    svg.append('text')
        .attr('x',300)
        .attr('y',0)
        .attr('font-size',24)
        .text('Test');

    svg.append('text')
        .attr('x',300)
        .attr('y',450)
        .attr('font-size',16)
        .text('x axis title');


    svg.append('text')
        .attr('transform','rotate(270)')
        .attr('x',-200)
        .attr('y',-50)
        .attr('font-size',16)
        .text('y axis title')

});


var scaleX= d3.scaleLinear().domain([0,400]).range([0,600]);
var scaleY= d3.scaleLinear().domain([500,0]).range([0,400]);


function buttonClicked(){
    console.log('here');
}