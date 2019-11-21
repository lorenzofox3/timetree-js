import {default as fetch, Headers, Request} from 'node-fetch';

export const ENDPOINT = 'https://timetreeapis.com';

export const fetchGET = async <T>(url: URL, token: string): Promise<T> => {
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.timetree.v1+json');
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('User-Agent', 'timetree-js (https://github/lorenzofox3/timetree-js)');

    const request = new Request(url.href, {
        method: 'GET',
        headers
    });

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error('network fucked up');
    }

    return response.json();
};

// export const requireProp = (prop: string) => <T>(fn: Function) => function(this: T){
//     if(!this[prop]){
//
//     }
//
//     return fn(this[prop]);
// };