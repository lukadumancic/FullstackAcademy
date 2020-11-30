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
      return Object.values(this.store);
    }
    const goodValues = [];
    Object.entries(this.store).forEach(([id, storeValue]) => {
      let isGood = true;
      Object.entries(item).forEach(([key, itemValue]) => {
        if (key === "id") {
          if (itemValue !== id) {
            isGood = false;
          }
        } else {
          if (itemValue !== storeValue[key]) {
            isGood = false;
          }
        }
      });
      if (isGood) {
        goodValues.push(storeValue);
      }
    });
    return goodValues;
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
