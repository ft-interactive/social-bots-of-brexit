import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import LineChart from './line-chart/index.jsx';

class ChartCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
    this.width = props.width;
    this.height = props.height;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  render() {
    const series = this.state.data;

    // console.log(series);

    const params = {
      width: this.width,
      height: this.height,
      marginTop: 13,
      marginRight: 8,
      marginBottom: 13,
      marginLeft: 8,
    };

    return (
      <Cell className="chart-cell">
        <LineChart
          {...params}
          series={series}
          style={{ padding: '0px' }}
        />
      </Cell>
    );
  }
}

ChartCell.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

// ChartCell.defaultProps = {
//   width: 0,
//   height: 0,
//   rowIndex: 0,
// };

export default ChartCell;
