import React, {Component} from "react";
import ReactDOM from "react-dom";
import d3 from "d3"
//using d3 and react. This is an experiment
export default class StackedBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 100,
      height: 16,
      xAxis: false,
      fillColor: 'black',
      data: [7,1,5,5,4,3,5,2,3,5,6],
      tooltip: false,
      tipOffset: [0,0],
      tipTemplate: (d, i) => {return "Value:"+d+", index: "+i+""}
    }
  }

  componentDidMount() {
      this.renderBarChart();
  }

  componentWillUnmount() {
      if (this.props.tooltip) {
        tooltip.remove();
      }
  }

  render(){
    return <svg />
  }

  renderBarChart(){
    var bar, barWidth, chart, height, tooltip, values, xAxis, y;
    if (this.props.hoverColor == null) {
      this.props.hoverColor = this.props.fillColor;
    }

    values = this.props.data?this.props.data.slice():this.state.data;

    y = d3.scale.linear().range([this.props.height, 0]);
    y.domain([0, Math.max.apply(null, values)]);
    if (this.props.xAxis) {
      height = this.props.height + 1;
    } else {
      height = this.props.height;
    }
    chart = d3.select(ReactDOM.findDOMNode(this)).attr("width", this.props.width).attr("height", height);
    barWidth = this.props.width / values.length;
    bar = chart.selectAll("g").data(values).enter().append("g").attr("transform", function(d, i) {
      return "translate(" + i * barWidth + ",0)";
    });
    bar.append("rect").attr("y", function(d) {
      return y(d);
    }).attr("height", (function(_this) {
      return function(d) {
        return _this.props.height - y(d);
      };
    })(this)).attr("width", barWidth - 1).attr("fill", this.props.fillColor)
    if (this.props.xAxis) {
      xAxis = d3.svg.axis().scale(d3.scale.linear().range([this.props.width - 1, 0])).orient("bottom");
      return chart.append("g").attr("class", "x axis").attr("fill", this.props.fillColor).attr("transform", "translate(0," + this.props.height + ")").call(xAxis);
    }
  }
}
