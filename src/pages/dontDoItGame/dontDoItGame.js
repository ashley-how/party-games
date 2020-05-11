import React, { useState } from 'react';

const DontDoItGame = props => {
    console.log(props.location.aboutProps)
    if (props.location.aboutProps.isLocalPlay) {
        return (
            <div className="main">
                <h2>DontDoItGame</h2>
                <div>Local Play</div>
            </div>
        );
    }

    else {
        return (
            <div className="main">
                <h2>DontDoItGame</h2>
                <div>Online Play:</div>
                <div>{props.location.aboutProps.numOfPlayers}</div>
            </div>
        );
    }
}

export default DontDoItGame;