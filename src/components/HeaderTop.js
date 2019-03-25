import React from "react";

// import Social from "./Social";
import ContactDetails from "./ContactDetails";
import Button from "./Button";

export default function HeaderTop(props) {
  return (
    <section className="page_topline cs table_section table_section_md columns_padding_0">
      <div className="container-fluid">
        <div className="row">
          <ContactDetails appointmentButton={props.appointmentButton} />
          {/* <Social
            classes="text-center visible-xs visible-sm"
            inputColor="#4bb0a9"
          /> */}

          {props.appointmentButton ? (
            <div className="col-md-3 text-center text-md-right bottommargin_0">
              <Button whereto="#appointment" text="Contact Me" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
