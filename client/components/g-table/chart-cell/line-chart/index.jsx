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
    this.referendumDate = null;
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

    this.line
      .x(d => this.xScale(d.index))
      .y(d => this.yScale(d.tweet_count))
      .interpolate('linear');

    this.area
      .x(d => this.xScale(d.index))
      .y0(this.height + 1)
      .y1(d => this.yScale(d.tweet_count));

    this.referendumDate = this.xScale(new Date('2016-06-23T00:00:00.000Z'));
  }

  render() {
    const translate = `translate(${this.props.marginLeft}, ${this.props.marginTop})`;
    const rule = (
      <line
        className="rule"
        x1={this.referendumDate}
        y1={-5}
        x2={this.referendumDate}
        y2={this.height + 6}
        transform={translate}
      />
    );
    const area = (
      <g>
        <linearGradient
          id="gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#5e82c8"
            stopOpacity={0.6}
          />

          <stop
            offset="100%"
            stopColor="#5e82c8"
            stopOpacity={0.3}
          />
        </linearGradient>

        <path
          className="area"
          d={this.area(this.state.series)}
          transform={translate}
          fill="url(#gradient)"
        />
      </g>
    );
    const line = (
      <path
        className="line"
        d={this.line(this.state.series)}
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
          {area}
          {line}
          {rule}
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
