import React from 'react';

export default class ServerStatusItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            curPlayers: -1,
            maxPlayers: -1,
            isError: false
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.props.url);
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
                    curPlayers: data.online,
                    maxPlayers: data.max
                });
            }
        }
        xhr.send();
    }

    render() {
        return (
            <div className="server-status-item">
                <span className="server-name">{this.props.name}</span>
                {this.state.isLoaded
                    ? <div className="server-status-players">{this.state.curPlayers}<span className="slash">/</span>{this.state.maxPlayers}</div>
                    : <div className="server-status-loading">
                        {this.state.isError
                        ? <div className="server-status-error">OFFLINE</div>
                        :<div className="loader"></div>
                        }
                    </div>
                }
            </div>
        );
    }
}