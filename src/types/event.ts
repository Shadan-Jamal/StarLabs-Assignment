export interface Event {
    id: string;
    title: string;
    type: string;
    date: string;
    location: string;
    host: string;
    description: string;
}

export interface Events extends Array<Event> {}
