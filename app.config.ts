// eslint-disable-next-line import/no-extraneous-dependencies
import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    API_URL: process.env.API_URL,
  },
});
