/**
 * Common
 */

export enum EntityType {
    USER = 'user',
    CALENDAR = 'calendar',
    LABEL = 'label'
}

export interface EntityData<T> {
    id: string;
    type: EntityType,
    attributes: T
}

export interface DataResponse<T> {
    data: T
}

export type Input<T> = { id?: string } & Partial<T>;

export interface ClientOptions {
    token: string;
}