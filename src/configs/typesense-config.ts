import Typesense from 'typesense';

export const clientTypesense = new Typesense.Client({
  nodes: [
    {
      host: import.meta.env.VITE_TYPESENSE_HOST,
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: import.meta.env.VITE_TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});
