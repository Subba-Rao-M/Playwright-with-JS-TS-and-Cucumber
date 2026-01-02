/**
 * like utility
 * to avoid duplicate codes
 * help in reusability by finding common code and create a separate file
 * module contains reusable classes, methods, functions like component
 * to make file module we have to use export
 * and to use in another file use import
 */

export let appName: string = "Calculator";

export function add(a: number, b:number): number{
    return a+b;

}

export class Formatter{

    static toUpper(value: string): string{
        return value.toUpperCase();
    }

}

console.log(Formatter.toUpper("Hello"));
 