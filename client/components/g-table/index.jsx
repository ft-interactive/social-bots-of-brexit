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
        width={130}
      />
    );

    const sparklineColumn = (
      <Column
        header={
          <Cell className="header-cell">Tweet volume</Cell>
        }
        cell={props => (
          <ChartCell
            {...props}
            data={this.state.data[props.rowIndex].timeseries}
          />
        )}
        width={130}
      />
    );

    const tweetsPerDayColumn = (
      <Column
        header={
          <Cell className="header-cell">Average no. tweets/day (Jun 20-26, 2016)</Cell>
        }
        cell={props => (
          <Cell
            {...props}
            style={{ textAlign: 'right' }}
          >
            {this.state.data[props.rowIndex].tweetsperday}
          </Cell>
        )}
        width={167}
      />
    );

    return (
      <Table
        rowsCount={this.state.data.length}
        rowHeight={this.state.rowHeight}
        headerHeight={this.state.headerHeight}
        width={427}
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
