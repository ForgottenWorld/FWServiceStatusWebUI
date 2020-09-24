import React, { useEffect, useState } from 'react';

export default function ServerStatusItem(props) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [curPlayers, setCurPlayers] = useState(-1);
    const [maxPlayers, setMaxPlayers] = useState(-1);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        fetch(props.url)
        .then(r => {
            
          if (r.status !== 200) {
            setIsError(true);
            return;
          }
    
          r.json().then(data => {
            setIsLoaded(true);
            setCurPlayers(data.online);
            setMaxPlayers(data.max);
          })

        })
        .catch(_ => setIsError(true));

    }, [setIsError, setCurPlayers, setMaxPlayers, setIsLoaded, props.url])

    return (
        <div className="server-status-item">
            <span className="server-name">{props.name}</span>
            {isLoaded
                ? <div className="server-status-players">
                        {curPlayers}<span className="slash">/</span>{maxPlayers}
                    </div>
                : <div className="server-status-loading">
                    {isError
                    ? <div className="server-status-error">OFFLINE</div>
                    :<div className="loader"></div>
                    }
                </div>
            }
        </div>
    );

}