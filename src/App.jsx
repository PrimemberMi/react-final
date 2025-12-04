import React, { useState } from 'react';
import WebMenu from './components/Menu';
import WebHeader from './components/Header';


function App() {
  const onClick = e => {
    console.log('click ', e);
  };

  return (
    <div>
      <WebHeader />
      <WebMenu />
    </div>
  );
}


export default App;