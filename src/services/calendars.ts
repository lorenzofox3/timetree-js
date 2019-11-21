import {ClientOptions, DataResponse, EntityData, Input} from '../lib/interfaces';
import {ENDPOINT, fetchGET} from '../lib/util';
import {User, UserData, users as userFactory} from './users';
import {Label, labels as labelFactory} from './labels';

export interface CalendarData {
    name: string;
    description: string;
    color: string;
    image_url: string;
    created_at: Date;
}

export type MemberResponse = DataResponse<Array<EntityData<UserData>>>;

export interface Calendar extends CalendarData {
    id: string;

    members(): Promise<User[]>;

    labels(): Promise<Label[]>;

    fetch(): Promise<Calendar>;
}

export type CalendarResponse = DataResponse<EntityData<CalendarData>>;

export type ListCalendarResponse = DataResponse<EntityData<CalendarData>[]>

export enum CalendarInclude {
    labels = 'labels',
    members = 'members'
}

export interface CalendarListOptions {
    include?: CalendarInclude[]
}

export interface CalendarService {
    from(calendar: Input<CalendarData>): Calendar;

    list(options?: CalendarListOptions): Promise<Calendar[]>

    fetch(id: string, options?: CalendarListOptions): Promise<Calendar>

    members(id: string): Promise<User[]>;

    labels(id: string): Promise<Label[]>
}

export const calendars = (options: ClientOptions): CalendarService => {
    const {token} = options;
    const users = userFactory(options);
    const labels = labelFactory(options);
    const service = {
        from(data: Input<CalendarData>) {
            return factory(data);
        },
        async list() {
            const url = new URL('/calendars', ENDPOINT);
            const {data} = await fetchGET<ListCalendarResponse>(url, token);
            return data.map(v => this.from({id: v.id, ...v.attributes}));
        },
        async fetch(id: string) {
            const url = new URL(`/calendars/${id}`, ENDPOINT);
            const {data} = await fetchGET<CalendarResponse>(url, token);
            return this.from({id: data.id, ...data.attributes});
        },
        async members(calendarId: string) {
            const url = new URL(`/calendars/${calendarId}/members`, ENDPOINT);
            const {data} = await fetchGET<MemberResponse>(url, token);
            return data.map(v => users.from({id: v.id, ...v.attributes}));
        },
        async labels(calendarId: string) {
            return labels.list(calendarId);
        }
    };

    const CalendarPrototype = {
        async labels() {
            if (!this.id) {
                throw new Error(`labels can only be fetched from a model instance with an id`);
            }
            return service.labels(this.id);
        },
        async members() {
            if (!this.id) {
                throw new Error(`members can only be fetched from a model instance with an id`);
            }
            return service.members(this.id);
        },
        async fetch() {
            if (!this.id) {
                throw new Error(`calendar can only be fetched from a model instance with an id`);
            }
            return service.fetch(this.id);
        }
    };

    const factory = (data: Input<CalendarData>): Calendar => {
        return Object.create(CalendarPrototype, {
            id: {
                enumerable: true,
                value: data.id
            },
            name: {
                enumerable: true,
                value: data.name
            },
            description: {
                enumerable: true,
                value: data.description
            },
            color: {
                enumerable: true,
                value: data.color
            },
            image_url: {
                enumerable: true,
                value: data.image_url
            },
            created_at: {
                enumerable: true,
                value: new Date(data.created_at)
            }
        });
    };

    return service;
};