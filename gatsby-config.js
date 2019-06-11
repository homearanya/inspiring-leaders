module.exports = {
  siteMetadata: {
    title: "Inspiring Leaders",
    defaultTitle: "Inspiring Leaders",
    description: `Inspiring Leaders offers leadership development and employee wellness 
    support to organizations, including training programmes, seminars, talks & workshops, 
    counselling for individuals and mindfulness training.`,
    canonicalUrl: "https://www.inspiring-leaders.co.za",
    image: "https://www.inspiring-leaders.co.za/img/logo.png",
    author: {
      name: "Alistair Mork-Chadwick",
      minibio: `
            <strong>Alistair Mork-Chadwick</strong> is a Counselling psychologist. 
            With organisations he draws on the latest research findings, specifically 
            those which deal with supporting optimal levels of work engagement, 
            cultivating a mindful approach to work, and building emotional intelligence.
          `
    },
    organization: {
      name: "Inspiring Leaders",
      url: "https://www.inspiring-leaders.co.za",
      logo: "https://www.inspiring-leaders.co.za/img/logo.png"
    },
    siteUrl: "https://www.inspiring-leaders.co.za" // for gatsby plugin sitemap
  },
  plugins: [
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.inspiring-leaders.co.za",
        sitemap: "https://www.inspiring-leaders.co.za/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-5T9QCD4",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans"]
        }
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "any",
        start_url: "/?homescreen=1",
        version: "1.0",

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Inspiring Leaders",
        short_name: "inspiring",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/assets/img/icon.png" // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`,
    // "gatsby-plugin-remove-serviceworker",
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/general`,
        name: "general"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src_images`,
        path: `${__dirname}/src/assets/img/`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 930,
              backgroundColor: "transparent" // required to display blurred image first
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          },
          "gatsby-remark-component"
        ]
      }
    },
    `gatsby-plugin-netlify-cms`,
    "gatsby-plugin-netlify-identity-widget",
    {
      resolve: "gatsby-plugin-netlify-cache",
      options: {
        cachePublic: true
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ],
  mapping: {
    "MarkdownRemark.frontmatter.ldArea.services.service": `MarkdownRemark.frontmatter.title`,
    "MarkdownRemark.frontmatter.ewsArea.services.service": `MarkdownRemark.frontmatter.title`,
    "MarkdownRemark.frontmatter.serviceRelated": `MarkdownRemark.frontmatter.title`
  }
};
