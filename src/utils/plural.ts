import { LOCALE_RU } from 'constants/plural.ts';

/**
 * Возвращает форму множественного числа по правилам локали (Intl.PluralRules).
 * @param value — число
 * @param variants — варианты для ключей: one, few, many, other (и опционально zero)
 * @param locale — локаль (по умолчанию LOCALE_RU)
 * @example plural(5, { one: 'день', few: 'дня', many: 'дней', other: 'дней' }) // 'дней'
 */
export const plural = (
  value: number,
  variants: Record<string, string> = {},
  locale = LOCALE_RU
) => {
  const key = new Intl.PluralRules(locale).select(value);
  return variants[key] || '';
};
