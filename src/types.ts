export type ValidationPath = (string | number)[]

export type ValidatorOptions = {
    shouldThrowErrorOnFail: true;
    path: ValidationPath;
}

export interface Validator<T> {
    (item: unknown, options?: ValidatorOptions): item is T;
    v: (args: T) => T;
    typeName: string;
}

type Writeable<T> = T extends (Record<string | number, unknown> | unknown[])
    ? { -readonly [P in keyof T]: T[P] } : T

type WValidator<T> = Validator<Writeable<T>>

export declare type ShapeValidator<T extends Record<string | number, unknown>> = {
    [K in keyof T]-?: WValidator<T[K]>;
}

export type TypeValidationError = {
    expectedTypeName: string;
    path: ValidationPath;
}
