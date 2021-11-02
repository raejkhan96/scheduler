import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js" // // Empty has function onAdd
import "components/Appointment/styles.scss"
import Form from "components/Appointment/Form.js"
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

// add within function?
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const DELETE_CONFIRM = "DELETE_CONFIRM";

export default function Appointment(props) {


  // The Form should capture the name and interviewer and pass them to props.onSave as arguments
  //  We then create a new interview object to be passed to props.bookInterview.
  function save(name, interviewer) {
    console.log('SAVE')
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
         .then(() => transition(SHOW))
  }

  function cancel() {
    console.log('DELETING')
    transition(DELETING)
    props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
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
        onDelete={() => {transition(DELETE_CONFIRM)}}
      />
      )} 
      {/*EMPTY MODE fills the calendar with the onAdd options */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETE_CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={() => cancel()}/>}
      {/* Transition mode to SAVING */}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} /> }
      {/* Without the CREATE mode, there is nothing to transition to and the section of the calendar disappears when clicked */}
      {mode === CREATE && <Form interviewers = {props.interviewers} onCancel = {back} onSave = { save }/> }
    </article>
  );

}
