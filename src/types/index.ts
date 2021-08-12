export type Extent = 'year' | 'month' | 'day' | 'hours' | 'minutes';
export type PlayVelocity = 'normal' | 'fast';

export interface SelectOption<T extends string = string> {
    label: string;
    value: T;
}