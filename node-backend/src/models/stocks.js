import Storage from '../storage/index.js';

/*
id
userId
ticker
*/

class Stocks extends Storage {
    constructor() {
        super();
    }

    update(ticker) {
        super.update(id, { ticker })
    }

    create(userId, ticker) {
        super.create({ userId, ticker });
    }
    
    delete(id) {
        super.delete(id);
    }
}

export default new Stocks();