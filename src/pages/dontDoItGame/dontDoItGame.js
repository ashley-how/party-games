import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import './dontDoItGame.css'
import CardService from '../../services/cardService';
import {
    Button,
    Card
} from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";

const losingPoints = -10;

const DontDoItGame = props => {
    const cardService = new CardService();
    const [actionCard, setActionCard] = useState(null);
    const [points, setPoints] = useState(0);
    const [loader, setLoader] = useState(false);

    const abortCtrl = new AbortController();

    const drawNewCard = async () => {
        let data = await cardService.getActionCard();
        setActionCard(data);
        setPoints(points - 1);
    }

    const startGame = () => {
        setLoader(true);
        const timer = setTimeout(async () => {
            let data = await cardService.getActionCard(abortCtrl.signal);
            setActionCard(data);
            setLoader(false);
        }, 1500);
        return () => {
            clearTimeout(timer);
            abortCtrl.abort();
        };
    }

    const newGame = () => {
        setActionCard(null);
        setPoints(0);
    }

    try {
        if (props.location.aboutProps.onlineMode) {
            return (
                <div className="main">
                    <h2>Don't do it!</h2>
                    <div>Online Mode</div>
                    <div>Number of players: {props.location.aboutProps.numOfPlayers}</div>
                    <h1>Work-in-progress</h1>
                </div>
            );
        }

        else {
            return (
                <div className="main">
                    <h2>{props.location.aboutProps.gameTitle}</h2>

                    <div className="loader-position">
                        <HashLoader
                            size={50}
                            color="teal"
                            loading={loader}
                        />
                    </div>

                    {
                        !loader &&
                        <>
                            {
                                actionCard ?
                                    <>
                                        <div>
                                            Points: {points}
                                        </div>

                                        <Card>
                                            {
                                                points === losingPoints ?
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
                                                points === losingPoints ?
                                                    <Button
                                                        className="game-button"
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => newGame()}
                                                    >
                                                        New Game?
                                                        </Button> :
                                                    <Button
                                                        className="game-button"
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => { drawNewCard() }}
                                                    >
                                                        Draw new card
                                            </Button>
                                            }
                                        </div>
                                    </> :
                                    <>
                                        <img
                                            src="./assets/dont-do-it.jpg"
                                            alt="Don't do it!"
                                        />

                                        <div className="instruction-card">
                                            <Card >
                                                {props.location.aboutProps.gameDescription}
                                            </Card>
                                        </div>

                                        <Button
                                            className="game-button"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => startGame()}
                                        >
                                            Start Game
                            </Button>
                                    </>
                            }
                        </>
                    }
                </div>
            );
        }
    }
    catch (e) {
        return <Redirect to='/' />;
    }
}

export default DontDoItGame;