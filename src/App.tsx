import React from 'react';
import './App.css';
import BoxForms from './containers/BoxForms/BoxForms';
import BoxList from './containers/BoxList/BoxList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Colorful Rectangles Editor</h1>
      <BoxForms />
      <BoxList />
    </div>
  );
};

export default App;
