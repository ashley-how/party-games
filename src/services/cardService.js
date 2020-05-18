export default class CardService {
    getActionCard = () => {
        return fetch('/getActionCard').then(res => res.json()).then(data => {
            return data.result;
        });
    }
}
