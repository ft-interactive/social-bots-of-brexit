import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';
import throttle from 'lodash/throttle';
import ChartCell from './chart-cell/index.jsx';

class GTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      rowHeight: 68,
      headerHeight: 68,
      pageWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', throttle(this.handleResize, 250));
  }

  handleResize() {
    this.setState({
      pageWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    });
  }

  render() {
    const tableWidth = this.state.pageWidth >= 568 ? 457 : 314;
    const accountNameColumn = (
      <Column
        header={
          <Cell className="header-cell">Account name</Cell>
        }
        cell={props => (
          <Cell {...props}>
            {this.state.data[props.rowIndex].screenname}
          </Cell>
        )}
        width={154}
      />
    );

    const sparklineColumn = (
      <Column
        header={
          <Cell className="header-cell">
            <div className="title">Tweets per day, Jan 2016-May 2017</div>
            <div className="legend">
              <svg
                width="20"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
                className="legend-bar"
              >
                <line
                  x1="0"
                  y1="7"
                  x2="20"
                  y2="7"
                  stroke="#990f3d"
                  strokeWidth="1"
                  strokeDasharray="4, 3"
                />
              </svg>

              <span className="legend-text">EU referendum, June 23, 2016</span>
            </div>
          </Cell>
        }
        cell={props => (
          <ChartCell
            {...props}
            data={this.state.data[props.rowIndex].timeseries}
          />
        )}
        width={158}
      />
    );

    let tweetsPerDayColumn;

    if (this.state.pageWidth >= 568) {
      tweetsPerDayColumn = (
        <Column
          header={
            <Cell className="header-cell">Avg. tweets per day, Jun 17-23, 2016</Cell>
          }
          cell={props => (
            <Cell
              {...props}
              style={{ textAlign: 'right' }}
            >
              {this.state.data[props.rowIndex].meanperdayeuref}
            </Cell>
          )}
          width={145}
        />
      );
    }

    return (
      <Table
        rowsCount={this.state.data.length}
        rowHeight={this.state.rowHeight}
        headerHeight={this.state.headerHeight}
        width={tableWidth}
        height={(this.state.data.length * this.state.rowHeight) + this.state.headerHeight + 2}
      >
        {accountNameColumn}
        {tweetsPerDayColumn}
        {sparklineColumn}
      </Table>
    );
  }
}

GTable.propTypes = {
  data: PropTypes.array, // eslint-disable-line
};

export default GTable;
