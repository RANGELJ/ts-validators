export type ValidatorOptions = {
    debugLogIsEnabled?: boolean;
}

export type Validator<T> = (item: unknown, options?: ValidatorOptions) => item is T

export type ShapeValidator<T extends Record<string | number, unknown>> = {
    [K in keyof T]: Validator<T[K]>;
}
