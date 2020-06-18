export default {
  server: {
    domain: process.env.NODE_ENV === 'production' ? '' : 'http://localhost',
    folder: '/pxgp_schedule',
  },
};
