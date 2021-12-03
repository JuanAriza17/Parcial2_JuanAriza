import React from 'react';
import Space from './components/spaces/Space.js';
import Room from './components/rooms/Room.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Space />
        <Room />
      </header>
    </div>
  );
}

export default App;
