export default class RequestMethods {
    protected api: string;
    protected token: string;
    protected error: string;
    protected id: string;
    protected coins: number;

    constructor() {
        this.api = 'http://134a-193-19-228-194.ngrok.io';
    }

    public getCoins = async (): Promise<void> => {
        // how much money was
        await fetch(`${this.api}/api/Auth/users?top=-1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.coins = data;
                console.log(this.coins, 1111111111111111);
            })
            .catch((err) => console.log(err));
    }

    public updateCoins = async (coins): Promise<void> => {
        // and update how much left after game;
        this.coins = +coins;
        console.log(coins);

        /*    this.sendData = {
            email: this.email.value,
            name: this.name.value,
            lastName: this.lastName.value,
            password: this.password.value,
        };
        await fetch(`${this.api}/api/admin/confirmation_code`, {
            method: 'PUT',
            body: this.sendCode,
            headers: {},
        })
            .then((response) => response.json())
            .then((data) => {
                this.error = data.errorText;
                this.accessToken = data.accessToken;
            })
            .catch((err) => console.log(err)); */
    }
}
