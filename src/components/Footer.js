import React from "react";

export default function Footer() {
  return (
    <footer className="page_footer cs main_color2 table_section section_padding_50 columns_padding_0">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-push-4 text-center">
            <a href="./" className="logo big text-shadow">
              Psychologist
              <span className="small-text">Premium HTML Template</span>
            </a>
          </div>

          <div className="col-sm-4 col-sm-pull-4 text-center text-sm-left text-md-left">
            <div className="widget widget_nav_menu greylinks">
              <ul className="menu divided_content wide_divider">
                <li className="">
                  <a href="./">Home</a>
                </li>
                <li className="">
                  <a href="about.html">About</a>
                </li>
                <li className="">
                  <a href="services.html">Services</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-4 text-center text-sm-right text-md-right">
            <div className="widget widget_nav_menu greylinks">
              <ul className="menu divided_content wide_divider">
                <li className="">
                  <a href="gallery-regular-3-cols.html">Gallery</a>
                </li>
                <li className="">
                  <a href="blog-right.html">Articles</a>
                </li>
                <li className="">
                  <a href="contact.html">Contacts</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
