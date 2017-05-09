import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';

class GTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      rowHeight: 40,
      headerHeight: 42,
    };
  }

  render() {
    const accountNameColumn = (
      <Column
        header={<Cell>Name</Cell>}
        cell={props => (
          <Cell {...props}>
            {this.state.data[props.rowIndex].screenname}
          </Cell>
        )}
        width={130}
      />
    );

    const tweetsPerDayColumn = (
      <Column
        header={<Cell>Average no. tweets per day (Jun 20-26, 2016)</Cell>}
        cell={props => (
          <Cell
            {...props}
            style={{ textAlign: 'right' }}
          >
            {this.state.data[props.rowIndex].tweetsperday}
          </Cell>
        )}
        width={170}
      />
    );

    return (
      <Table
        rowsCount={this.state.data.length}
        rowHeight={this.state.rowHeight}
        headerHeight={this.state.headerHeight}
        width={300}
        height={(this.state.data.length * this.state.rowHeight) + this.state.headerHeight + 2}
      >
        {accountNameColumn}
        {tweetsPerDayColumn}
      </Table>
    );
  }
}

GTable.propTypes = {
  data: PropTypes.array, // eslint-disable-line
};

export default GTable;
