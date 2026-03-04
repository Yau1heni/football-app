export type FilterOption = { key: string; value: string };

/** Опция по ключу (для Dropdown value по ключу из URL) */
export const getOptionByKey = (key: string, options: FilterOption[]): FilterOption | null =>
  options.find((o) => o.key === key) ?? null;

/** Выбранные опции по списку значений (для MultiDropdown value) */
export const getSelectedOptions = (
  selectedValues: string[],
  options: FilterOption[]
): FilterOption[] => options.filter((o) => selectedValues.includes(o.value));

/** Заголовок для списка опций (для MultiDropdown getTitle) */
export const getOptionsTitle = (options: FilterOption[], defaultTitle: string): string =>
  options.length > 0 ? options.map((o) => o.value).join(', ') : defaultTitle;
