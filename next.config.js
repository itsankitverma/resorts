const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */

module.exports = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['tailwindui.com', 'assets.stickpng.com', 'images.unsplash.com', 'www.gravatar.com', ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === "development",
  },
})

