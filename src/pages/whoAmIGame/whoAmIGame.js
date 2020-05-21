import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import './whoAmIGame.css'
import CardService from '../../services/cardService';
import {
    Button,
    Card
} from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";

const WhoAmIGame = props => {
    const cardService = new CardService();
    const [characterCard, setCharacterCard] = useState(null);
    const [points, setPoints] = useState(0);
    const [loader, setLoader] = useState(false);

    const abortCtrl = new AbortController();

    const drawNewCard = async () => {
        let data = await cardService.getCharacterCard();
        setCharacterCard(data);
        setPoints(points - 1);
    }

    const startGame = () => {
        setLoader(true);
        const timer = setTimeout(async () => {
            let data = await cardService.getCharacterCard(abortCtrl.signal);
            setCharacterCard(data);
            setLoader(false);
        }, 1500);
        return () => {
            clearTimeout(timer);
            abortCtrl.abort();
        };
    }

    const newGame = () => {
        setCharacterCard(null);
        setPoints(0);
    }

    try {
        if (props.location.aboutProps.isLocalPlay) {
            return (
                <div className="main">
                    <h2>Who am I?</h2>

                    <HashLoader
                        size={50}
                        color="teal"
                        loading={loader}
                    />

                    {
                        !loader &&
                        <>
                            {
                                characterCard ?
                                    <>
                                        <div>
                                            Points: {points}
                                        </div>

                                        <Card>
                                            {
                                                points == -10 ?
                                                    <div className="character-card">
                                                        You lose!
                                                        </div> :
                                                    <div className="character-card">
                                                        {characterCard}
                                                    </div>
                                            }
                                        </Card>

                                        <div className="button-section">
                                            {
                                                points == -10 ?
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
                                        <div className="game-logo">
                                            <img
                                                height="150"
                                                src="./assets/guess.png"
                                                alt="Who am I?"
                                            />
                                        </div>

                                        <div>// Add game intructions here.</div>

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

        else {
            return (
                <div className="main">
                    <h2>Who am I?</h2>
                    <div>Online Mode</div>
                    <div>Number of players: {props.location.aboutProps.numOfPlayers}</div>
                    <h1>Work-in-progress</h1>
                </div>
            );
        }
    }
    catch (e) {
        return <Redirect to='/' />;
    }
}

export default WhoAmIGame;