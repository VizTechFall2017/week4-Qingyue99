
var clicked = false;

var svg = d3.select('svg').append('g').attr('transform','translate(200,175)');

var scaleX = d3.scalePoint().domain(["Never", "Less than once per month","Once per month","Once per week",
    "2-3 times per week","4-5 times per week", "Everyday"]).range([0, 700]);
var scaleY = d3.scaleLinear().domain([0,100]).range([300, 0]);

svg.append("g")
    .attr('transform','translate(0,300)')
    .call(d3.axisBottom(scaleX));


svg.append("g")
    .call(d3.axisLeft(scaleY));


d3.csv('./Workoutweek5.csv', function(dataIn) {

    console.log(dataIn);
/*
   datahowoften = dataIn.filter(function(d){
         return d.howoften == howoften;
     });


     datawithin = dataIn.filter(function(d){
         return d.within == within;
     });
*/

    svg.append('text')
        .text("The Frequency of NEU Students Go To Gym (Near Campus)")
        .attr('transform', 'translate(300, 350)')
        .attr('font-size',15)
        .style('text-anchor', 'middle');


    svg.append('text')
        .text("How often do you go to the gym?")
        .attr('transform', 'translate(300, -50)')
        .attr('font-size',30)
        .style('text-anchor', 'middle');

    svg.append('text')
        .text('percent')
        .attr('font-size',15)
        .attr('transform', 'translate(-90, 140)');

    svg.selectAll('circles')
        .data(dataIn)
        .enter()
        .append('circle')
        .attr('r', function(d){return (d.howoften)*0.3;})
        .attr('class', 'howoften')
        .attr('title', function(d){return d.howoften})
        .attr('fill', "lime");


    svg.selectAll('circles')
        .data(dataIn)
        .enter()
        .append('circle')
        .attr('r', function(d){return (d.within)*0.3;})
        .attr('title', function(d){return d.within})
        .attr('class', 'within')
        .attr('fill', "blue");

    drawPoints(dataIn);
    $('.howoften').tooltip();
    $('.within').tooltip();


});



function drawPoints(dataIn){

    svg.selectAll('.howoften')
        .data(dataIn)

        .attr('cx',function(d){
            return scaleX(d.frequency);
        })
        .attr('cy',function(d){
            return scaleY(d.howoften);
        })

        .attr('data-toggle', 'tooltip')

        .attr('title', function(d) {
            return d.howoften
        });


    svg.selectAll('.within')
        .data(dataIn)
        .attr('cx',function(d){
            return scaleX(d.frequency);
        })
        .attr('cy',function(d){
            return scaleY(d.within);
        })
        .attr('data-toggle', 'tooltip')

        .attr('title', function(d) {
            return d.within
        });
}

function buttonClicked(){
    if(clicked == true){
        //drawPoints(datahowoften);
        $('.howoften').css('opacity', '1');
        $('.within').css('opacity', '0');
        clicked = false;
    }
    else{
        //drawPoints(datawithin);
        $('.howoften').css('opacity', '0');
        $('.within').css('opacity', '1');
        clicked = true;
    }


}

