import Storage from '../storage/index.js';

/*
id
username
password
*/

class Stocks extends Storage {
    constructor() {
        super();
    }

    create(username, password) {
        super.create({ username, password });
    }
    
}

export default new Stocks();