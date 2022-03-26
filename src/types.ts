export type ValidatorOptions = {
    debugLogIsEnabled?: boolean;
}

export type Validator<T> = (item: unknown, options?: ValidatorOptions) => item is T
