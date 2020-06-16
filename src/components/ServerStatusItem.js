import React from 'react';

export default class ServerStatusItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            curPlayers: -1,
            maxPlayers: -1
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "https://cors-anywhere.herokuapp.com/" + this.props.url);
        xhr.responseType = 'text/plain';
        xhr.onload = () => {
            if (xhr.status !== 200) {
/*                 this.setState({
                isError: true
                }) */
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
                    : <div className="server-status-loading"><div className="loader"></div></div>
                }
            </div>
        );
    }
}