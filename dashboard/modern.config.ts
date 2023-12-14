import appTools, { defineConfig } from '@modern-js/app-tools';
import garfishPlugin from '@modern-js/plugin-garfish';

export default defineConfig<'rspack'>({
  dev: {
    port: 8082,
  },
  runtime: {
    router: true,
    state: true,
  },
  deploy: {
    microFrontend: true,
  },
  plugins: [appTools(), garfishPlugin()],
});
