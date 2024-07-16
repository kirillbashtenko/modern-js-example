import appTools, { defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';

export default defineConfig({
  runtime: {
    router: true,
    masterApp: true,
  },
  plugins: [appTools(), garfishPlugin()],
});
