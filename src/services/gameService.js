export default class GameService {
    getAllGames = (signal = null) => {
        return fetch('https://party-games-api.herokuapp.com/getAllGames', {signal: signal}).then(res => res.json()).then(data => {
            return data.result;
        });
    }

    getGameModes = (signal = null) => {
        return fetch('https://party-games-api.herokuapp.com/getGameModes', {signal: signal}).then(res => res.json()).then(data => {
            return data.result;
        });
    }
}