import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import minimist from 'minimist';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'src/index.js',
  output: {
    name: 'VuetifyCrud',
    exports: 'named',
    globals: {
      vue: 'Vue',
      'vuetify': 'Vuetify',
      'vuetify/lib': 'Vuetify',
      'lodash': 'lodash'
    }
  },
  external: [ 'vue', 'vuetify', 'vuetify/lib', 'lodash' ],
  plugins: [
    // scss({
    //   output: 'dist/vue-flag.css',
    //   outputStyle: 'compressed'
    // }),
    // async(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    // buble({
    //   objectAssign: 'Object.assign',
    //   // transforms: { asyncAwait: false }
    //   // as
    // }),
    resolve(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**' // only transpile our source code
    }),

    commonjs(),
  ]
};

// if (argv.format === 'iife') {
//   config.plugins.push(uglify());
// }

export default config;
