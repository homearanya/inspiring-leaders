var netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`
  }
};

module.exports = {
  siteMetadata: {
    title: "Alistair Mork-Chadwick",
    defaultTitle: "Alistair Mork-Chadwick · Counselling Psychologist",
    description: `Alistair Mork-Chadwick is a Counselling psychologist based in Howick. 
      He offers personal counselling, career guidance, 
      psychological assessments and mindfulness training.`,
    canonicalUrl: "https://www.alistairmork-chadwick.co.za",
    image:
      "https://www.alistairmork-chadwick.co.za/img/alistair-mork-chadwick.png",
    author: {
      name: "Alistair Mork-Chadwick",
      minibio: `
            <strong>Alistair Mork-Chadwick</strong> is a Counselling psychologist based in Howick. 
            He offers personal counselling, career guidance, 
            psychological assessments and mindfulness training.
          `
    },
    organization: {
      name: "Alistair Mork-Chadwick · Counselling Psychologist",
      url: "https://www.alistairmork-chadwick.co.za",
      logo: "https://www.alistairmork-chadwick.co.za/img/logo.png"
    },
    siteUrl: "https://www.alistairmork-chadwick.co.za" // for gatsby plugin sitemap
  },
  plugins: [
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
        name: "Alistair Mork-Chadwick · Counselling Psychologist",
        short_name: "alistair",
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
        path: `${__dirname}/src/pages`,
        name: "pages"
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
        path: `${__dirname}/static/img`,
        name: "staticimages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src_images`,
        path: `${__dirname}/src/assets/img/`
      }
    },
    netlifyCmsPaths, // Including in your Gatsby plugins will transform any paths in your frontmatter
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          netlifyCmsPaths, // Including in your Remark plugins will transform any paths in your markdown body
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
          "gatsby-remark-component"
        ]
      }
    },
    `gatsby-plugin-netlify-cms`,
    "gatsby-plugin-netlify-identity-widget",
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ],
  mapping: {
    "MarkdownRemark.fields.homeservices": `MarkdownRemark`,
    "MarkdownRemark.fields.ldCoursesUCourses": `MarkdownRemark`,
    "MarkdownRemark.fields.uCourseLDCourses": `MarkdownRemark`
  }
};
