export interface Location {
    pathname: string,
    state:any,
}

export interface RouterContextValue {
    location?:Location,
}
export default {};