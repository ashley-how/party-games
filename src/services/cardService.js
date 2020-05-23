export default class CardService {
    getActionCard = (signal = null) => {
        return fetch('https://party-games-api.herokuapp.com/getActionCard', { signal: signal }).then(res => res.json()).then(data => {
            return data.result;
        });
    }

    getCharacterCard = (signal = null) => {
        return fetch('https://party-games-api.herokuapp.com/getCharacterCard', { signal: signal }).then(res => res.json()).then(data => {
            return data.result;
        });
    }
}
