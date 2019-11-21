import nock from 'nock';
import {ENDPOINT} from '../../src/lib/util';

export const createNock = ({token = 'some_token'} = {token: 'some_token'}) => nock(ENDPOINT, {
    reqheaders: {
        accept: 'application/vnd.timetree.v1+json',
        authorization: `Bearer ${token}`
    }
});