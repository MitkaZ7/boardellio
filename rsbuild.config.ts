import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });
export default defineConfig({
    plugins: [pluginReact()],
    output: {
        distPath: {
            root: 'dist',
        },
    },
    source: {
        define: publicVars,
    },
    html: {
        title: 'Boardellio',
        favicon: './src/assets/icons/logo-monochrome.svg',
    },
    
});