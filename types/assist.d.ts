type PickKeysByType<T, B> = {
  [P in keyof T]: T[P] extends B ? P : never;
}[keyof T];

type PickByType<T, B> = Pick<T, Extract<keyof T, PickKeysByType<T, B>>>;

type PickNotType<T, B> = Pick<T, Exclude<keyof T, PickKeysByType<T, B>>>;
