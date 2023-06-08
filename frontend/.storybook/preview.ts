import type { Preview } from "@storybook/react";
import '../src/index.css';
import '../src/App.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: 'wave-dark',
      values: [
        {
          name: 'wave-dark',
          value: '#211C1C',
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
