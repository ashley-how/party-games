export default class CardService {
    getActionCard = () => {
        return fetch('https://party-games-api.herokuapp.com/getActionCard').then(res => res.json()).then(data => {
            return data.result;
        });
    }
}
