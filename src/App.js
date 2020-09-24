import React, { useEffect, useState } from 'react';
import './App.css';
import ServerStatusItem from './components/ServerStatusItem'

export default function App() {

  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [servers, setServers] = useState([]);

  useEffect(() => {

    fetch('https://fwapi.forgottenworld.it/servers')
    .then(r => {

      if (r.status !== 200) {
        setIsError(true);
        return;
      }

      r.json().then(data => {
        setIsLoaded(true)
        setServers(data.map(s => { return {
          name: s,
          url: `https://fwapi.forgottenworld.it/server/${s}`
        } }))
      });

    })
    .catch(_ => setIsError(true));

  }, [setIsError, setIsLoaded, setServers])

  return (
    <div className="app">
        <div className="logo-container">
          <img className="logo" alt="FW Logo" src="https://cdn.statically.io/gh/ForgottenWorld/images/58b85a5a/logo.webp"></img>
        </div>
        <div className="server-status-list">
          {
            isError
              ? <div className="server-error">API OFFLINE</div>
              : isLoaded
                ? servers.map((s, i) => <ServerStatusItem key={`ssi-i`} name={s.name} url={s.url}></ServerStatusItem>)
                : <div className="loader"></div>
          }
        </div>
    </div>
  );
}
