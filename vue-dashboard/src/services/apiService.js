class ApiService {
    constructor(token = null) {
        this.token = token;
    }

    async fetch(url, method = 'GET') {
        const response = await fetch(url, {
            method,
            headers: this.getHeaders()
        });
        const data = await response.json();
        return data;
    }

    setToken(token) {
        this.token = token;
    }

    getHeaders() {
        if (this.token) {
            return new Headers({
                Authorization: 'Bearer ' + this.token
            });
        }
        return new Headers({});
    }
}

export default new ApiService();