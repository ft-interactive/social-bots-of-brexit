import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';

class GTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  render() {
    const accountNameColumn = (
      <Column
        header={<Cell>Account name</Cell>}
        cell={props => (
          <Cell {...props}>
            {this.state.data[props.rowIndex].accountName}
          </Cell>
        )}
        width={200}
      />
    );

    const tweetsPerDayColumn = (
      <Column
        header={<Cell>Average no. tweets per day</Cell>}
        cell={props => (
          <Cell {...props}>
            {this.state.data[props.rowIndex].tweetsPerDay}
          </Cell>
        )}
        width={200}
      />
    );

    return (
      <Table
        rowsCount={this.state.data.length}
        rowHeight={50}
        headerHeight={50}
        width={400}
        height={500}
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
