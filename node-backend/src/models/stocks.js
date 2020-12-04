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

    update(userId, ticker) {
        const items = super.get({
            userId,
            ticker
        });
        if (items.length === 1) {
            super.update(items[0].id, { ticker });
        }
    }

    create(userId, ticker) {
        super.create({ userId, ticker });
    }
    
    delete(userId, ticker) {
        const items = super.get({
            userId,
            ticker
        })
        if (items.length === 1) {
            super.delete(items[0].id);
            return true;
        }
        return false;
    }
}

export default new Stocks();