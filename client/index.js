import React from 'react';
import ReactDOM from 'react-dom';
import GTable from './components/g-table/index.jsx';

function App() {
  return (
    <GTable
      data={[
        { accountName: '@Col_Connaughton', tweetsPerDay: 1346 },
      ]}
    />
  );
}

const reactApp = <App />;

ReactDOM.render(reactApp, document.getElementById('react-app'));
