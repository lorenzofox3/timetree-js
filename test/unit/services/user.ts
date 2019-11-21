import {Assert} from 'zora';
import {users as users} from '../../../src/services/users';
import {createNock} from '../util';

export default (t: Assert) => {
    t.test(`fetch the user when API call is successful`, async t => {
        const expected = createNock({token: 'user_token'})
            .get('/user')
            .reply(200, {
                data: {
                    id: '12345',
                    type: 'user',
                    attributes: {
                        name: 'Laurent',
                        description: 'blah blah blah',
                        image_url: 'https://foo.com/avatar'
                    }
                }
            });

        const resp = await users({token: 'user_token'}).me();

        t.ok(expected.isDone());
        t.eq(resp, {
            id: '12345',
            name: 'Laurent',
            description: 'blah blah blah',
            image_url: 'https://foo.com/avatar'
        });
    });

    t.skip(`fetch a user when API call fails`, async t => {

    });
}