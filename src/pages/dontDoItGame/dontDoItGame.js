import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import './dontDoItGame.css'
import CardService from '../../services/cardService';
import {
    Button,
    Card
} from '@material-ui/core';

const DontDoItGame = props => {
    const cardService = new CardService();
    const [actionCard, setActionCard] = useState(null);
    const [points, setPoints] = useState(0)

    const drawNewCard = async () => {
        let data = await cardService.getActionCard();
        setActionCard(data);
        setPoints(points - 1);
    }

    const startGame = async () => {
        let data = await cardService.getActionCard();
        setActionCard(data);
    }

    const newGame = () => {
        setActionCard(null);
        setPoints(0);
    }

    try {
        if (props.location.aboutProps.isLocalPlay) {
            return (
                <div className="main">
                    <h2>Don't do it!</h2>

                    <div>
                        Points: {points}
                    </div>

                    <Card>
                        {
                            points == -10 ?
                                <div className="action-card">
                                    You lose!
                                </div> :
                                <div className="action-card">
                                    {actionCard}
                                </div>
                        }
                    </Card>

                    <div className="button-section">
                        {
                            points == -10 ?
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => newGame()}
                                >
                                    New Game?
                                </Button> :
                                <Button
                                    variant="outlined"
                                    color={
                                        actionCard ? "primary" : "secondary"
                                    }
                                    onClick={() => {
                                        actionCard ? drawNewCard() : startGame()
                                    }}
                                >
                                    {
                                        actionCard ? "Draw new card" : "Start Game"
                                    }
                                </Button>
                        }
                    </div>
                </div>
            );
        }

        else {
            return (
                <div className="main">
                    <h2>Don't do it!</h2>
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

export default DontDoItGame;