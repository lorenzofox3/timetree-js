import {Assert} from 'zora';
import {createNock} from '../util';
import {calendars as calendars} from '../../../src/services/calendars';

export default (t: Assert) => {
    t.test(`fetch a list of calendars data from service`, async t => {
        const expected = createNock({token: 'other_token'})
            .get('/calendars')
            .reply(200, {
                'data': [
                    {
                        'id': '1234',
                        'type': 'calendar',
                        'attributes': {
                            'name': 'Some Calendar1',
                            'description': 'Calendar description',
                            'color': '#2ecc87',
                            'image_url': 'https://attachments.timetreeapp.com/path/to/image.png',
                            'created_at': '2019-04-01T12:34:56.000Z'
                        },
                        'relationships': {
                            'labels': {
                                'data': [
                                    {'id': '1234,1', 'type': 'label'},
                                    // ...
                                    {'id': '1234,10', 'type': 'label'}
                                ]
                            },
                            'members': {
                                'data': [
                                    {'id': '1234,12345', 'type': 'user'},
                                    {'id': '1234,23456', 'type': 'user'}
                                ]
                            }
                        }
                    },
                    {
                        'id': '5678',
                        'type': 'calendar',
                        'attributes': {
                            'name': 'Some Calendar2',
                            'description': 'Calendar description',
                            'color': '#2ecc87',
                            'image_url': 'https://attachments.timetreeapp.com/path/to/image.png',
                            'created_at': '2019-04-01T12:34:56.000Z'
                        },
                        'relationships': {
                            // ...
                        }
                    }
                ],
                'included': [
                    {
                        'id': '1234,1',
                        'type': 'label',
                        'attributes': {
                            'name': 'label title(empty if default)',
                            'color': '#2ecc87'
                        }
                    },
                    // ...
                    {
                        'id': '1234,12345',
                        'type': 'user',
                        'attributes': {
                            'name': 'User1',
                            'description': 'blah blah blah',
                            'image_url': 'https://attachments.timetreeapp.com/path/to/image.png'
                        }
                    }
                    // ...
                ]
            });

        const service = calendars({token: 'other_token'});
        const resp = await service.list();

        t.eq(resp, [service.from({
            id: '1234',
            name: 'Some Calendar1',
            description: 'Calendar description',
            color: '#2ecc87',
            image_url: 'https://attachments.timetreeapp.com/path/to/image.png',
            created_at: new Date('2019-04-01T12:34:56.000Z')
        }), service.from({
            id: '5678',
            name: 'Some Calendar2',
            description: 'Calendar description',
            color: '#2ecc87',
            image_url: 'https://attachments.timetreeapp.com/path/to/image.png',
            created_at: new Date('2019-04-01T12:34:56.000Z')
        })]);
        t.ok(expected.isDone());
    });

    t.test(`fetch a particular calendar data from service`, async t => {
        const expected = createNock({token: 'a_token'})
            .get('/calendars/1234')
            .reply(200, {
                'data': {
                    'id': '1234',
                    'type': 'calendar',
                    'attributes': {
                        'name': 'Some Calendar',
                        'description': 'Calendar description',
                        'color': '#2ecc87',
                        'image_url': 'https://attachments.timetreeapp.com/path/to/image.png',
                        'created_at': '2019-04-01T12:34:56.000Z'
                    },
                    'relationships': {
                        'labels': {
                            'data': [
                                {'id': '1234,1', 'type': 'label'},
                                {'id': '1234,2', 'type': 'label'},
                                {'id': '1234,3', 'type': 'label'},
                                {'id': '1234,4', 'type': 'label'},
                                {'id': '1234,5', 'type': 'label'},
                                {'id': '1234,6', 'type': 'label'},
                                {'id': '1234,7', 'type': 'label'},
                                {'id': '1234,8', 'type': 'label'},
                                {'id': '1234,9', 'type': 'label'},
                                {'id': '1234,10', 'type': 'label'}
                            ]
                        },
                        'members': {
                            'data': [
                                {'id': '1234,12345', 'type': 'user'},
                                {'id': '1234,23456', 'type': 'user'}
                            ]
                        }
                    }
                },
                'included': [
                    {
                        'id': '1234,1',
                        'type': 'label',
                        'attributes': {
                            'name': 'label title(empty if default)',
                            'color': '#2ecc87'
                        }
                    },
                    {
                        'id': '1234,12345',
                        'type': 'user',
                        'attributes': {
                            'name': 'User1',
                            'description': 'blah blah blah',
                            'image_url': 'https://attachments.timetreeapp.com/path/to/image.png'
                        }
                    }
                ]
            });

        const service = calendars({token: 'a_token'});

        const resp = await service
            .fetch('1234');

        t.ok(expected.isDone());

        t.eq(resp, service.from({
            id: '1234',
            name: 'Some Calendar',
            description: 'Calendar description',
            color: '#2ecc87',
            image_url: 'https://attachments.timetreeapp.com/path/to/image.png',
            created_at: new Date('2019-04-01T12:34:56.000Z')
        }));
    });

    t.test(`fetch a particular calendar data from instance`, async t => {
        const expected = createNock({token: 'a_token'})
            .get('/calendars/1234')
            .reply(200, {
                'data': {
                    'id': '1234',
                    'type': 'calendar',
                    'attributes': {
                        'name': 'Some Calendar',
                        'description': 'Calendar description',
                        'color': '#2ecc87',
                        'image_url': 'https://attachments.timetreeapp.com/path/to/image.png',
                        'created_at': '2019-04-01T12:34:56.000Z'
                    },
                    'relationships': {
                        'labels': {
                            'data': [
                                {'id': '1234,1', 'type': 'label'},
                                {'id': '1234,2', 'type': 'label'},
                                {'id': '1234,3', 'type': 'label'},
                                {'id': '1234,4', 'type': 'label'},
                                {'id': '1234,5', 'type': 'label'},
                                {'id': '1234,6', 'type': 'label'},
                                {'id': '1234,7', 'type': 'label'},
                                {'id': '1234,8', 'type': 'label'},
                                {'id': '1234,9', 'type': 'label'},
                                {'id': '1234,10', 'type': 'label'}
                            ]
                        },
                        'members': {
                            'data': [
                                {'id': '1234,12345', 'type': 'user'},
                                {'id': '1234,23456', 'type': 'user'}
                            ]
                        }
                    }
                },
                'included': [
                    {
                        'id': '1234,1',
                        'type': 'label',
                        'attributes': {
                            'name': 'label title(empty if default)',
                            'color': '#2ecc87'
                        }
                    },
                    {
                        'id': '1234,12345',
                        'type': 'user',
                        'attributes': {
                            'name': 'User1',
                            'description': 'blah blah blah',
                            'image_url': 'https://attachments.timetreeapp.com/path/to/image.png'
                        }
                    }
                ]
            });

        const service = calendars({token: 'a_token'});

        const instance = service.from({id: '1234'});

        const resp = await instance
            .fetch();

        t.ok(expected.isDone());

        t.eq(resp, service.from({
            id: '1234',
            name: 'Some Calendar',
            description: 'Calendar description',
            color: '#2ecc87',
            image_url: 'https://attachments.timetreeapp.com/path/to/image.png',
            created_at: new Date('2019-04-01T12:34:56.000Z')
        }));
    });

    t.skip(`fetch calendar members from service`, async t => {
        throw new Error('not Implemented');
    });

    t.skip(`fetch calendar members from instance`, async t => {
        throw new Error('not Implemented');
    });
}