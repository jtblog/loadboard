export interface Odds {
    win?: number;
    lose?: number;
    draw?: number;
}

export interface Betschema {
    desc: string;
    photoURL?: string,
    category_path: string,
    odds: Odds
    results: object,
    choice: string,
    option: number,
    expiry: Date,
    categories: Array<any>,
    n_o_path?: number,
    no_of_subscribers?: number
    id?: string
}
