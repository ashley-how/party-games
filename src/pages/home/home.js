import React, { useState, useEffect } from 'react';
import './home.css'
import { Link } from 'react-router-dom';
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


const Home = () => {
    const [localPlay, setLocalPlay] = useState(true);
    const [numOfPlayers, setNumOfPlayers] = useState(2);
    const [actionCard, setActionCard] = useState(null);

    useEffect(() => {
        fetch('/getActionCard').then(res => res.json()).then(data => {
            console.log(data.result);
            setActionCard(data.result);
        });
    }, []);

    return (
        <div className="main">
            {
                actionCard &&
                <p>Card picked is {actionCard}.</p>
            }

            <div className="card-size">
                <Link
                    to={{
                        pathname: '/dontDoItGame',
                        aboutProps: {
                            isLocalPlay: localPlay,
                            numOfPlayers: localPlay ? null : numOfPlayers
                        }
                    }}
                >
                    <Card>
                        <CardMedia
                            className="card-media"
                            image="./assets/dont-do-it.jpg"
                            title="Don't Do It"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Don't do it!
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <div className="card-size">
                <Link
                    to={{
                        pathname: '/guessMeGame',
                        aboutProps: {
                            isLocalPlay: localPlay,
                            numOfPlayers: localPlay ? null : numOfPlayers
                        }
                    }}
                >
                    <Card>
                        <CardMedia
                            className="card-media"
                            image="./assets/guess.png"
                            title="Guess who I am!"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Guess me!
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <div>
                {

                }

                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={localPlay}
                                onChange={(event) =>
                                    setLocalPlay(event.target.checked)
                                }
                            />
                        }
                        label={
                            localPlay ? <b>Offline mode</b> : <b>Online mode</b>
                        }
                    />
                </FormGroup>
            </div>

            {
                localPlay ?
                    <div>Works the same as physical cards. Player can only see the cards of other players shown on other players' phones.</div> :
                    <div>Player can see other players' cards on their own phone but not their own card.</div>
            }

            {
                !localPlay &&
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
                                    max: 7,
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
        </div>
    );
}

export default Home;