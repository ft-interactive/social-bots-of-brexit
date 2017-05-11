import React, { Component } from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';
// import Axis from './axis.jsx';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.series,
    };
    this.width = props.width;
    this.height = props.height;
    this.xScale = d3.time.scale();
    this.yScale = d3.scale.linear();
    this.parseDate = d3.time.format.iso.parse;
    this.line = d3.svg.line();
    this.area = d3.svg.area();
    this.updateD3 = this.updateD3.bind(this);

    this.updateD3(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      series: nextProps.series,
    });

    this.updateD3(nextProps);
  }

  updateD3(props) {
    this.width = props.width - props.marginLeft - props.marginRight;
    this.height = props.height - props.marginTop - props.marginBottom;

    this.state.series.forEach((obj) => {
      const d = obj;

      d.index = this.parseDate(d.index);
    });

    this.xScale
      .domain(d3.extent(this.state.series, d => d.index))
      .range([0, this.width]);

    this.yScale
      .domain([0, d3.max(this.state.series, d => d.tweet_count)])
      .range([this.height, 0]);

    console.log(this.height);

    this.line
      .x(d => this.xScale(d.index))
      .y(d => this.yScale(d.tweet_count))
      .interpolate('linear');

    this.area
      .x(d => this.xScale(d.index))
      .y0(this.height)
      .y1(d => this.yScale(d.tweet_count));
  }

  render() {
    const translate = `translate(${this.props.marginLeft}, ${this.props.marginTop})`;
    const line = (
      <path
        className="line"
        d={this.line(this.state.series)}
        transform={translate}
      />
    );
    const area = (
      <path
        className="area"
        d={this.area(this.state.series)}
        transform={translate}
      />
    );
    let lineChart = null;

    if (!line) {
      lineChart = (
        <g>
          <text
            textAnchor="middle"
            x={this.props.width / 2}
            y={22}
          >
            Loading chart…
          </text>
        </g>
      );
    } else {
      lineChart = (
        <g>
          {/* {axis} */}
          {line}
          {area}
        </g>
      );
    }

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
        {lineChart}
      </svg>
    );
  }
}

LineChart.propTypes = {
  series: PropTypes.array.isRequired, // eslint-disable-line
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  marginRight: PropTypes.number.isRequired,
};

export default LineChart;
