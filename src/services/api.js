import { Cache } from "./cache";
import { USER_TOKEN, API_HOST } from '../constants';

export async function fetchData(uri, cachePrefix = '', defaultObject = {}) {
    const cache = new Cache(cachePrefix, defaultObject);

    const response = await fetch(`${API_HOST}${uri}`, {
        method: 'GET',
        headers: {
            "X-Token": USER_TOKEN,
            "Content-Type": "application/json"
        }
    });

    let res = {...defaultObject};

    if(response.ok) {
        res = await response.json();
        cache.data = res;
    } else {
        res = cache.data;
    }

    return res;
}