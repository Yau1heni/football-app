import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from 'constants/auth.ts';

export const isEmpty = (value: string): boolean => !value || value.trim() === '';

export const isValidEmail = (value: string): boolean => EMAIL_REGEX.test(value.trim());

export const isPasswordValid = (value: string): boolean => value.length >= MIN_PASSWORD_LENGTH;

export const validateEmail = (value: string): string | null => {
  if (isEmpty(value)) return 'Поле обязательно';
  if (!isValidEmail(value)) return 'Некорректный email';
  return null;
};

export const validatePassword = (value: string): string | null => {
  if (isEmpty(value)) return 'Поле обязательно';
  if (!isPasswordValid(value)) return 'Пароль должен быть не меньше 5 символов';
  return null;
};

export const validateRequired = (value: string): string | null => {
  if (isEmpty(value)) return 'Поле обязательно';
  return null;
};
