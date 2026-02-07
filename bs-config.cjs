module.exports = {
  files: [
    'dest/app/wp-content/themes/roleup_2026/**/*.php',
    'dest/app/wp-content/themes/roleup_2026/**/*.css',
    'dest/app/wp-content/themes/roleup_2026/**/*.js',
  ],
  proxy: 'https://person-local-wp.dev',
  https: true,
  port: 3000,
  ui: {
    port: 3003,
  },
  open: false,
  notify: false,
  ghostMode: false,
};
