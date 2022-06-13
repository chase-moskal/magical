export interface Rules {
    [key: string]: string;
}
export declare type Expression = [string, Rules, Expression[]];
