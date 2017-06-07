import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';
import ChartCell from './chart-cell/index.jsx';

class GTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      rowHeight: 68,
      headerHeight: 42,
    };
  }

  render() {
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
          <Cell className="header-cell">Tweet volume Jan 2016-May 2017</Cell>
        }
        cell={props => (
          <ChartCell
            {...props}
            data={this.state.data[props.rowIndex].timeseries}
          />
        )}
        width={131}
      />
    );

    const tweetsPerDayColumn = (
      <Column
        header={
          <Cell className="header-cell">Avg. tweets per day Jun 17-23, 2016</Cell>
        }
        cell={props => (
          <Cell
            {...props}
            style={{ textAlign: 'right' }}
          >
            {this.state.data[props.rowIndex].meanperdayeuref}
          </Cell>
        )}
        width={143}
      />
    );

    return (
      <Table
        rowsCount={this.state.data.length}
        rowHeight={this.state.rowHeight}
        headerHeight={this.state.headerHeight}
        width={428}
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
