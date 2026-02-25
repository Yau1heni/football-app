/** ID заголовка секции для aria-labelledby */
export const LOGIN_PAGE_TITLE_ID = 'login-page-title';
export const REGISTER_PAGE_TITLE_ID = 'register-page-title';

export const AUTH_MUTATION_KEYS = {
  LOGIN_WITH_EMAIL: ['loginWithEmail'],
  REGISTER_WITH_EMAIL: ['registerWithEmail'],
  AUTH_WITH_GOOGLE: ['authWithGoogle'],
  AUTH_WITH_GITHUB: ['authWithGithub'],
} as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 6;
