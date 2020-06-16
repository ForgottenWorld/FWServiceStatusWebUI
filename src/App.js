import React from 'react';
import './App.css';
import ServerStatusItem from './components/ServerStatusItem'
import logo from './logo.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      isLoaded: false,
      servers: []
    }
  }


  componentDidMount() {

    const xhr = new XMLHttpRequest();
        xhr.open('GET', "https://fwapi.forgottenworld.it/servers");
        xhr.responseType = 'application/json';
        xhr.onload = () => {
            if (xhr.status !== 200) {
                this.setState({
                  isError: true
                }) 
            } else {
                const data = JSON.parse(xhr.response);
                
                this.setState({
                    isLoaded: true,
                    servers: data.map(s => { return {
                      name: s,
                      url: "https://fwapi.forgottenworld.it/serben/" + s
                    } })
                });
            }
        }
        xhr.onerror = () => {
            this.setState({
              isError: true
            }) 
        }
        xhr.send();
  }

  render () {
    return (
      <div className="app">
          <div className="logo-container">
            <img className="logo" alt="FW Logo" src={logo}></img>
          </div>
          <div className="server-status-list">
            {
              this.state.isError
                ? <div className="server-error">API OFFLINE</div>
                : this.state.isLoaded
                  ? this.state.servers.map(s => <ServerStatusItem name={s.name} url={s.url}></ServerStatusItem>)
                  : <div className="loader"></div>
            }
          </div>
      </div>
    );
  }
}