/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.tagberegneren.dk',
    generateRobotsTxt: true, // (optional)
    exclude: ['/pris', '/beregning'],
    priority: 1
  }