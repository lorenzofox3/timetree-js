# timetree-js

Javascript client for [TimeTree API](https://developers.timetreeapp.com/en/docs/api)

## Install 

``npm install timetree-js``

## Usage 

### Nodejs

simply import the service factory from the package

```javascript
import {calendars} from 'timetree-js'
```

### Browsers

Import the ``browser.js`` file from the installed package

```javascript
import {calendars} from 'node_modules/timetree-js/dist/bundle/browser.js'
```

## API 

### Auth

If you use a [personal access token](https://timetreeapp.com/personal_access_token), simply put it in the options of the service factory you are going to use

example with calendars
```javascript
import {calendars} from 'timetree-js';
const calendarService = calendars({token});

// etc
```

If you are building an OAuth app, you will need first to get the authorization token matching the user before using any service

```javascript
import {auth} from 'timetree-js';

// todo

```

Obviously, you can re use any of the services created with a given token

### users service

#### me

Get the current user (matching the token)

```javascript
import {users} from 'timetree-js';

const user = await users({token:'your token'}).me(); 
```

### Calendars service

Note that the service's methods return instance of the matching entities.

#### list

```javascript
import {calendars} from 'timetree-js';

const calendarItems = await calendars({token}).list();
```
### details

```javascript
import {calendars} from 'timetree-js';

const myCalendar = await calendars({token}).fetch('1234');
```

Alternatively you can create first a model instance

```javascript
import {calendars} from 'timetree-js';

const modelInstance = calendars({token}).from({id:'1234'});

const myCalendar = await modelInstance.fetch();
```
### members

To get the members instances: functions return user model instances

```javascript
import {calendars} from 'timetree-js';

const members = await calendars({token}).members('1234');
```

Or from model instance

```javascript
import {calendars} from 'timetree-js';

const modelInstance = calendars({token}).from({id:'1234'});

const members = await modelInstance.members();
``` 

### labels

// todo

### Events

// todo


