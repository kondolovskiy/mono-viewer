export class Cache {

    constructor(prefix, defaultObject = {} ) {
        this.key = `MONO-CACHE-${prefix}`;
        this.defaultObject = JSON.stringify(defaultObject);
    }

    cacheData(data) {
        window.sessionStorage.setItem(this.key, JSON.stringify(data));
    }

    getCachedData() {
        return JSON.parse(window.sessionStorage.getItem(this.key) || this.defaultObject);
    }

    set data(data) {
        this.cacheData(data);
    }

    get data() {
        return this.getCachedData();
    }
}