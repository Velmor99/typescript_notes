class Admin {
    login: string;
    password: string;

    set _login(l: string | number) {
        this.login = 'user-' + l;
    }

    get _login() {
        return this.login
    }

    async setPassword(p: string) {

    }
}

const admin1 = new Admin()
admin1.login = 'myLogin';
console.log(admin1)
console.log(admin1.login)
