import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

import "../assets/css/bootstrap.min.css";
// import "../assets/css/animations.css";
// import "../assets/css/fonts.css";
import "../assets/css/main.css";
import "../assets/css/custom.css";

import HeaderTop from "./HeaderTop";
import { Header } from "./Header";
// import Footer from "./Footer";
import FooterBottom from "./FooterBottom";
import ScrollUp from "./ScrollUp";

export default function Layout(props) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          SiteMetaDataQuery: site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => {
        const siteTitle = data.SiteMetaDataQuery.siteMetadata.title;
        const titleTemplate = `%s · ${siteTitle}`;
        return (
          <React.Fragment>
            <Helmet
              key="app-head"
              titleTemplate={titleTemplate}
              defaultTitle={siteTitle}
            >
              <html lang="en" />

              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              {/* google search console */}
              {/* <meta
                name="google-site-verification"
                content="5Fs1mwvNeUdz1y6CfK5miXOOFUra094G_nhpRiVyXXQ"
              /> */}
              {/* Font Awesome */}
              <script
                defer
                src="https://use.fontawesome.com/releases/v5.7.1/js/solid.js"
                integrity="sha384-6FXzJ8R8IC4v/SKPI8oOcRrUkJU8uvFK6YJ4eDY11bJQz4lRw5/wGthflEOX8hjL"
                crossorigin="anonymous"
              />
              <script
                defer
                src="https://use.fontawesome.com/releases/v5.7.1/js/brands.js"
                integrity="sha384-zJ8/qgGmKwL+kr/xmGA6s1oXK63ah5/1rHuILmZ44sO2Bbq1V3p3eRTkuGcivyhD"
                crossorigin="anonymous"
              />
              <script
                defer
                src="https://use.fontawesome.com/releases/v5.7.1/js/fontawesome.js"
                integrity="sha384-Qmms7kHsbqYnKkSwiePYzreT+ufFVSNBhfLOEp0sEEfEVdORDs/aEnGaJy/l4eoy"
                crossorigin="anonymous"
              />
            </Helmet>

            <div id="canvas">
              <div id="box_wrapper">
                <HeaderTop appointmentButton={props.appointmentButton} />
                <Header currentPageSlug={props.currentPageSlug} />
                {props.children}
                {/* <Footer /> */}
                <FooterBottom />
                <ScrollUp />
              </div>
            </div>
          </React.Fragment>
        );
      }}
    />
  );
}
