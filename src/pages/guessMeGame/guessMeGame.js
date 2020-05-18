import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'

const GuessMeGame = props => {
    try {
        if (props.location.aboutProps.isLocalPlay) {
            return (
                <div className="main">
                    <h2>Guess Me!</h2>
                    <div>Offline Mode</div>
                </div>
            );
        }

        else {
            return (
                <div className="main">
                    <h2>Guess Me!</h2>
                    <div>Online Mode</div>
                    <div>{props.location.aboutProps.numOfPlayers}</div>
                </div>
            );
        }
    }
    catch (e) {
        return <Redirect to='/' />;
    }
}

export default GuessMeGame;