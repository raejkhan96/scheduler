import React from "react";
// import classNames from 'classnames';
// import "components/Button.scss";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
// // Empty has function onAdd
import Empty from "components/Appointment/Empty.js"
import "components/Appointment/styles.scss"
import Form from "components/Appointment/Form.js"
import useVisualMode from "hooks/useVisualMode";


// add within function?
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  // Should this function be outside?

  // The Form should capture the name and interviewer and pass them to props.onSave 
  // as arguments
  //  We then create a new interview object to be passed to props.bookInterview.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log('PROPS: ', props);
  return ( 
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? (<Show student={props.interview.student} interviewer={props.interview.interviewer.name} />) : (<Empty />) } */}
      {/* SHOW MODE displays booked interviews */}
      {mode === SHOW && props.interview && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
      )} 
      {/*EMPTY MODE fills the calendar with the onAdd options */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* Without the CREATE mode, there is nothing to transition to and the section of the calendar disappears when clicked */}
      {mode === CREATE && <Form interviewers = {props.interviewers} onCancel = { back } onSave = { save }/> }
    </article>
  );

}
