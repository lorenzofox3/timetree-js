import {ClientOptions, DataResponse, EntityData, Input} from '../lib/interfaces';
import {fetchGET} from '../lib/util';

export enum EventCategory {
    SCHEDULE = 'schedule',
    KEEP = 'keep',
}

export interface EventData {
    category: EventCategory,
    title: string,
    all_day: boolean,
    start_at: Date,
    end_at: Date,
    recurrences: any[],
    description: string,
    location: string,
    url: string,
    updated_at: Date,
    created_at: Date
}

export interface Event extends EventData {
    id: string;
    calendar_id: string;

    fetch(): Promise<Event>;
}

export type EventResponse = DataResponse<EntityData<EventData>>;

export type EventInputType = Input<Partial<EventData & { calendar_id: string }>>;

export interface EventService {
    fetch(calendarId: string, eventId: string): Promise<Event>;

    from(data: EventInputType): Event;
}

export const events = (options: ClientOptions): EventService => {
    const {token} = options;
    const service = {
        from(data: EventInputType) {
            return factory(data);
        },
        async fetch(calendarId: string, eventId: string): Promise<Event> {
            const url = new URL(`/calendars/${calendarId}/events/${calendarId}`);
            const {data} = await fetchGET<EventResponse>(url, token);
            return this.from({id: eventId, calendar_id: calendarId, ...data.attributes});
        }
    };

    const EventPrototype = {
        async fetch(): Promise<Event> {
            if (!this.id) {
                throw new Error(`Event can only be fetched from a model instance with an id`);
            }

            if (!this.id) {
                throw new Error(`Event can only be fetched from a model instance with a calendar_id`);
            }

            return service.fetch(this.id, this.calendar_id);
        }
    };

    const factory = (data: EventInputType) => Object.create(EventPrototype, {
        id: {
            enumerable: true,
            value: data.id
        },
        calendar_id: {
            enumerable: true,
            value: data.calendar_id
        },
        category: {
            enumerable: true,
            value: data.category
        },
        title: {
            enumerable: true,
            value: data.title
        },
        all_day: {
            enumerable: true,
            value: data.all_day
        },
        start_at: {
            enumerable: true,
            value: new Date(data.start_at)
        },
        end_at: {
            enumerable: true,
            value: new Date(data.end_at)
        },
        recurrences: {
            enumerable: true,
            value: data.recurrences
        },
        description: {
            enumerable: true,
            value: data.description
        },
        location: {
            enumerable: true,
            value: data.location
        },
        url: {
            enumerable: true,
            value: data.location
        },
        updated_at: {
            enumerable: true,
            value: new Date(data.updated_at)
        },
        created_at: {
            enumerable: true,
            value: new Date(data.created_at)
        }
    });

    return service;
};