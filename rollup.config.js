import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/notify.js',
    dest: 'dist/notify.js',
    format: 'umd',
    moduleName: 'Notify',
    plugins: [ babel() ]
};
