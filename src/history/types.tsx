export interface Location {
    pathname: string,
    state:any,
}

export interface Message {
    (location: Location): string | undefined;
}

export type LocationDescription = string | Location;

export interface History {
    prompt: Message | null;
    push: (to: LocationDescription) => void;
    block: (param: Message | null) => void;
};