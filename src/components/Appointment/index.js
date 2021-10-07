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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
      {mode === CREATE && <Form interviewers = {[]} onCancel = { back }/> }
    </article>
  );

}

// export default function Appointment(props) {
//   const EMPTY = "EMPTY";
//   const SHOW = "SHOW";
//   const CREATE = "CREATE"
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );
//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       {/* {props.interview ? (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer.name}/>) : (<Empty />)} */}
//        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}  />}
//        {mode === SHOW &&  (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//         />
//       )}

//       {mode=== CREATE && (<Form interviewers = [] />)}
//     </article>
//   );
// } 