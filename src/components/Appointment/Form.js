import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const reset = function() {
    setName("")
    setInterviewer(null)
  }

  const cancel = function() {
    reset()
    props.onCancel()
  }

  // we need to validate 3 scenarios
  // 1) if interviewer is null and name is an empty string
  // 2) if interviewer is null
  // 3) if name is an empty string
  // set up an alert, if error -> call upon validation class -> appointments__validation
  const save = function() {
    
    if (!interviewer && name === "") {
      setError("You missed interviewer selection and name")
      return
    } else if (!interviewer) {
      setError("You missed interviewer selection")
      return
    } else if (name === "") {
      setError("You missed writing a name")
      return
    }
    
    props.onSave(name, interviewer)
  }

  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder={"Enter Student Name"}
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
            />
        </form>
        <section className="appointment__validation"> {error} </section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={save}>Save</Button>
        
      </section>
      </section>
    </main>
  );

}