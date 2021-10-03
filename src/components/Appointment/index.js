import React from "react";
// import classNames from 'classnames';
// import "components/Button.scss";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
// // Empty has function onAdd
import Empty from "components/Appointment/Empty.js"
import "components/Appointment/styles.scss"



export default function Appointment(props) {

  return ( 
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer.name} />) : (<Empty />) }
    </article>
  );

}