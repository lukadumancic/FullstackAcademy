export default class Storage {
    constructor() {
        this.store = {};
        this.id = 0;
    }

    create(item) {
        if (!item.id) {
            item.id = this.nextId();
        }
        if (this.store[item.id]) {
            throw `Item with id ${item.id} already exists`;
        }
        this.store[item.id] = item;
    }

    get(item) {
        if (!item) {
            return Object.entries(this.store);
        }
        return Object.entries(this.store).filter(([id, storeValue]) => {
            let isGood = true;
            console.log(item);
            Object.entries(item).forEach(([key, itemValue]) => {
                if (key === 'id') {
                    if (itemValue !== id) {
                        isGood = false;
                    }
                } else {
                    if (itemValue !== storeValue[key]) {
                        isGood = false;
                    }
                }
                return isGood;
            })
        });
    }

    update(id, item) {
        this.store[id] = item;
    }

    delete(id) {
        delete this.store[id];
    }

    nextId() {
        this.id += 1;
        return this.id;
    }
}