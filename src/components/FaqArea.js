import React from "react";

import video_tab1 from "../assets/images/video_tab1.jpg";
import video_tab2 from "../assets/images/video_tab2.jpg";
import video_tab3 from "../assets/images/video_tab3.jpg";

export default function FaqArea() {
  return (
    <section
      id="faq"
      className="ls section_padding_top_130 section_padding_bottom_100"
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h2 className="section_header ">Frequently Asked Questions</h2>
            <p>
              Exercitation cupim ex, short ribs cow in ullamco corned beef
              veniam kevin. Eu frankfurter ham hock ball tip reprehenderit
              adipisicing ipsum jerky tenderloin aliquip.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="panel-group" id="accordion1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion1"
                      href="#collapse1"
                      className="collapsed"
                    >
                      What can I expect in the first session when I see a
                      psychologist?
                    </a>
                  </h4>
                </div>
                <div id="collapse1" className="panel-collapse collapse">
                  <div className="panel-body">
                    Exercitation cupim ex, short ribs cow in ullamco corned beef
                    veniam kevin. Eu frankfurter ham hock ball tip reprehenderit
                    adipisicing ipsum jerky tenderloin.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion1"
                      href="#collapse2"
                      className="collapsed"
                    >
                      What are the sings of being abused by your partner?
                    </a>
                  </h4>
                </div>
                <div id="collapse2" className="panel-collapse collapse">
                  <div className="panel-body">
                    Exercitation cupim ex, short ribs cow in ullamco corned beef
                    veniam kevin. Eu frankfurter ham hock ball tip reprehenderit
                    adipisicing ipsum jerky tenderloin.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion1"
                      href="#collapse3"
                      className="collapsed"
                    >
                      What specific qualities are you looking for?
                    </a>
                  </h4>
                </div>
                <div id="collapse3" className="panel-collapse collapse">
                  <div className="panel-body">
                    Exercitation cupim ex, short ribs cow in ullamco corned beef
                    veniam kevin. Eu frankfurter ham hock ball tip reprehenderit
                    adipisicing ipsum jerky tenderloin.
                  </div>
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion1"
                      href="#collapse4"
                      className="collapsed"
                    >
                      How much money do psychologists make?
                    </a>
                  </h4>
                </div>
                <div id="collapse4" className="panel-collapse collapse">
                  <div className="panel-body">
                    Exercitation cupim ex, short ribs cow in ullamco corned beef
                    veniam kevin. Eu frankfurter ham hock ball tip reprehenderit
                    adipisicing ipsum jerky tenderloin.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="tab-content padding_0">
              <div className="tab-pane fade in active" id="tab1">
                <div className="embed-responsive embed-responsive-16by9">
                  <a
                    href="//player.vimeo.com/video/1084537"
                    className="embed-placeholder"
                  >
                    <img src={video_tab1} alt="" />
                  </a>
                </div>
              </div>

              <div className="tab-pane fade" id="tab2">
                <div className="embed-responsive embed-responsive-16by9">
                  <a
                    href="//player.vimeo.com/video/1084537"
                    className="embed-placeholder"
                  >
                    <img src={video_tab2} alt="" />
                  </a>
                </div>
              </div>

              <div className="tab-pane fade" id="tab3">
                <div className="embed-responsive embed-responsive-16by9">
                  <a
                    href="//player.vimeo.com/video/1084537"
                    className="embed-placeholder"
                  >
                    <img src={video_tab3} alt="" />
                  </a>
                </div>
              </div>
            </div>

            <ul className="nav nav-image" role="tablist">
              <li className="active">
                <a href="#tab1" role="tab" data-toggle="tab">
                  <img src={video_tab1} alt="" />
                </a>
              </li>
              <li>
                <a href="#tab2" role="tab" data-toggle="tab">
                  <img src={video_tab2} alt="" />
                </a>
              </li>
              <li>
                <a href="#tab3" role="tab" data-toggle="tab">
                  <img src={video_tab3} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
