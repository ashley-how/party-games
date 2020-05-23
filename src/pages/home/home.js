import React, { useState, useEffect } from 'react';
import './home.css'
import { Link } from 'react-router-dom';
import GameService from '../../services/gameService';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Switch,
    Slider,
    Grid,
    Input,
    FormGroup,
    FormControlLabel
} from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";

const getImage = title => ({
    dontDoItGame:
        <CardMedia
            className="card-media"
            image="./assets/dont-do-it.jpg"
            title={title}
        />,
    whoAmIGame:
        <CardMedia
            className="card-media"
            image="./assets/guess.png"
            title={title}
        />
})

const GAME_MODE = {
    OFFLINE: "Offline",
    ONLINE: "Online"
}

const Home = () => {
    const [onlineMode, setOnlineMode] = useState(false);
    const [numOfPlayers, setNumOfPlayers] = useState(2);
    const [games, setGames] = useState([]);
    const [modes, setModes] = useState([]);

    const gameService = new GameService();
    const abortCtrl = new AbortController();

    useEffect(() => {
        const fetchGames = async () => {
            let data = await gameService.getAllGames();
            setGames(data);
        };

        const fetchGameModes = async () => {
            let data = await gameService.getGameModes();
            setModes(data);
        }

        const timer = setTimeout(async () => {
            fetchGames(abortCtrl.signal);
            fetchGameModes(abortCtrl.signal);
        }, 1500);
        return () => {
            clearTimeout(timer);
            abortCtrl.abort();
        };
    }, [])

    const getModeDetails = selectedMode => {
        let res = modes.find(mode => mode.mode === selectedMode);
        return <div>{res.description}</div>;
    }

    return (
        <div className="main">
            <div className="loader-position">
                <HashLoader
                    size={50}
                    color="teal"
                    loading={games.length === 0 || modes.length === 0}
                />
            </div>

            {
                games.map(game =>
                    <div className="card-size" key={game.id}>
                        <Link
                            to={{
                                pathname: `/${game.path}`,
                                aboutProps: {
                                    gameTitle: game.title,
                                    gameDescription: game.description,
                                    onlineMode: onlineMode,
                                    numOfPlayers: onlineMode ? numOfPlayers : null
                                }
                            }}
                        >
                            <Card>
                                {
                                    getImage(game.title)[game.path]
                                }
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {game.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                )
            }

            {
                modes.length > 0 &&
                <>
                    <div className="mode-card">
                        <Card>
                            <div>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={onlineMode}
                                                onChange={(event) =>
                                                    setOnlineMode(event.target.checked)
                                                }
                                            />
                                        }
                                        label={
                                            onlineMode ? <b>{GAME_MODE.ONLINE}</b> : <b>{GAME_MODE.OFFLINE}</b>
                                        }
                                    />
                                </FormGroup>
                            </div>

                            {
                                onlineMode ? getModeDetails(GAME_MODE.ONLINE) : getModeDetails(GAME_MODE.OFFLINE)
                            }
                        </Card>
                    </div>

                    {
                        onlineMode &&
                        <div className="slider-section">
                            <div>
                                <b>Number of players:</b>
                                <Grid item>
                                    <Input
                                        className="input-align"
                                        value={numOfPlayers}
                                        margin="dense"
                                        inputProps={{
                                            step: 1,
                                            min: 2,
                                            max: 10,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                            </div>

                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider
                                        step={1}
                                        min={2}
                                        max={7}
                                        valueLabelDisplay="auto"
                                        value={numOfPlayers}
                                        onChange={(event, newValue) =>
                                            setNumOfPlayers(newValue)
                                        }
                                    />
                                </Grid>

                            </Grid>
                        </div>
                    }
                </>
            }

        </div>
    );
}

export default Home;