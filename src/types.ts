export type ValidationPath = (string | number)[]

export type ValidatorOptions = {
    shouldThrowErrorOnFail: true;
    path: ValidationPath;
}

export interface Validator<T> {
    (item: unknown, options?: ValidatorOptions): item is T;
    v: (args: T) => T;
}

export type ShapeValidator<T extends Record<string | number, unknown>> = {
    [K in keyof T]-?: Validator<T[K]>;
}

export type TypeValidationError = Error & {
    path?: ValidationPath;
}
