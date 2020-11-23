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

    update(password) {
        super.update(id, { password })
    }

    create(username, password) {
        super.create({ username, password });
    }
    
    delete(id) {
        super.delete(id);
    }
}

export default new Stocks();