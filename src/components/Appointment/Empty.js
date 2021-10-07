import React from "react";
// import classNames from 'classnames';
// import "components/Button.scss";
import "components/Appointment/styles.scss"

export default function onAdd(props) {
  // console.log('ONADD ', props)
  return ( 
    <main className="appointment__add">
      <img 
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        // onClick = 
        onClick={props.onAdd}
      />
    </main>
  );

}