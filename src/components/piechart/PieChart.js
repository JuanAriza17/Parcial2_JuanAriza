import React, { useEffect} from "react";
import { useIntl } from "react-intl";
import * as d3 from "d3";

function PieChart(props){
    
    const intl = useIntl();

    useEffect(()=>{
        const width = 450;
        const height = 450;
        const margin = 40;

        const radius = width/2 - margin;

        const colorScale = d3     
            .scaleSequential()      
            .interpolator(d3.interpolateWarm)      
            .domain([0, props.data.length]);

        d3.select('#pie-container')
        .select('svg')
        .remove();

        const svg = d3
        .select('#pie-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const arcGenerator = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);

        const pieGenerator = d3
        .pie()
        .padAngle(0)
        .value((d) => d.powerUsage.value);

        const arc = svg
        .selectAll()
        .data(pieGenerator(props.data))
        .enter();


        // create a tooltip
        var tooltip = d3.select("#pie-container")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function(e, d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
            .style('stroke-width', 2)
        }
        const mousemove = function(e, d) {
            const name = intl.formatMessage(({id: `${d.data.name}`}))
            tooltip
                .html(name +": " + d.data.powerUsage.value)
                .style("left", (e.pageX)+ 10 + "px")
                .style("top", (e.pageY)- 25 + "px")
                .style("display", "inline-block")
        }
        const mouseleave = function(e, d) {
        tooltip
            .style("opacity", 0)
            .style("display", "none")
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .style('stroke-width', 0)         
        }

        arc
        .append('path')
        .attr('d', arcGenerator)
        .style('fill', (_, i) => colorScale(i))
        .style('stroke', '#ffffff')
        .style("opacity", 0.8)
        .style('stroke-width', 0)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    ;

    },[intl, props.data]);


    return(<div id="pie-container"/>);
}

export default PieChart;