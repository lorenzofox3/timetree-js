import {ClientOptions, DataResponse, EntityData, Input} from '../lib/interfaces';
import {ENDPOINT, fetchGET} from '../lib/util';

export interface LabelData {
    name: 'string';
    color: 'string';
}

export type ListLabelResponse = DataResponse<Array<EntityData<LabelData>>>;

export interface Label extends LabelData {
    id: string;
}

export interface LabelService {

    from(data: Input<LabelData>): Label;

    list(calendarId: string): Promise<Label[]>;
}

export const labels = (options: ClientOptions): LabelService => {
    const {token} = options;

    const service = {
        from(data: Input<LabelData>) {
            return factory(data);
        },

        async list(calendarId: string) {
            const url = new URL(`/calendars/${calendarId}/labels`, ENDPOINT);
            const {data} = await fetchGET<ListLabelResponse>(url, token);
            return data.map(v => this.from({id: v.id, ...v.attributes}));
        }
    };

    const factory = (data: Input<LabelData>): Label => Object.defineProperties({}, {
        id: {
            enumerable: true,
            value: data.id
        },
        name: {
            enumerable: true,
            value: data.name
        },
        color: {
            enumerable: true,
            value: data.color
        }
    });

    return service;
};