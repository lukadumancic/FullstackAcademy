import Storage from '../storage/index.js';

/*
id
userId
cityId
*/

class Stocks extends Storage {
    constructor() {
        super();
    }

    update(cityId) {
        super.update(id, { cityId })
    }

    create(userId, cityId) {
        super.create({ userId, cityId });
    }
    
    delete(id) {
        super.delete(id);
    }
}

export default new Stocks();