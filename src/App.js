import React from 'react';
import './App.css';
import servers from './servers';
import ServerStatusItem from './components/ServerStatusItem'
import logo from './logo.png';

function App() {
  return (
    <div className="app">
        <div className="logo-container">
          <img className="logo" alt="FW Logo" src={logo}></img>
        </div>
        <div className="server-status-list">
          {
            servers.map(s =>
              <ServerStatusItem name={s.name} url={s.url}></ServerStatusItem>
            )
          }
        </div>
    </div>
  );
}

export default App;
