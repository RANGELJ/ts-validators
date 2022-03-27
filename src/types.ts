export type ValidatorOptions = {
    debugLogIsEnabled: true;
}

export interface Validator<T> {
    (item: unknown, options?: ValidatorOptions): item is T;
    v: (args: T) => T;
}

export type ShapeValidator<T extends Record<string | number, unknown>> = {
    [K in keyof T]-?: Validator<T[K]>;
}
