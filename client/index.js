import React from 'react';
import ReactDOM from 'react-dom';
import GTable from './components/g-table/index.jsx';

function App() {
  const accountsData = JSON.parse(document.getElementById('accounts-data').textContent);

  return (
    <GTable
      data={accountsData}
    />
  );
}

const reactApp = <App />;

ReactDOM.render(reactApp, document.getElementById('react-app'));
