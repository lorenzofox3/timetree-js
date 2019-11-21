import {
    ClientOptions,
    DataResponse,
    EntityData,
    Input
} from '../lib/interfaces';
import {ENDPOINT, fetchGET} from '../lib/util';

export interface UserData {
    name: string;
    description: string;
    image_url: string;
}

export interface User extends UserData {
    id: string;
}

export interface UserService {
    me(): Promise<User>;

    from(data: Input<UserData>): User;
}

export type GetUserResponse = DataResponse<EntityData<UserData>>;

export const users = (options: ClientOptions): UserService => {
    const {token} = options;

    const service = {
        from(data: Input<UserData>) {
            return factory(data);
        },
        async me() {
            const url = new URL('/user', ENDPOINT);
            const {data} = await fetchGET<GetUserResponse>(url, token);
            return this.from({id: data.id, ...data.attributes});
        }
    };

    const factory = (data: Input<User>): User => Object.defineProperties({}, {
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
        image_url: {
            enumerable: true,
            value: data.image_url
        }
    });

    return service;
};
