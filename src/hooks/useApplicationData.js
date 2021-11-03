import React, { useEffect, useState } from "react";
import axios from "axios";

// Create a transition function within useVisualMode 
// that will take in a new mode and update the mode state with the new value

export default function useApplicationData() {
  
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
        },
      },
      {
        id: 3,
        time: "2pm",
        interview: {
          student: "John Doe",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
        },
      },
      {
        id: 4,
        time: "3pm",
      },
      {
        id: 5,
        time: "4pm",
        interview: {
          student: "Jane Doe",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
        },
      },
    ],
    interviewers: {
      1: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);


  function bookInterview(id, interview) {
    // id is appointment id
    // interview contains interviewer (number) and student name (string
  

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // setState({
    //   ...state,
    //   appointments
    // })

    console.log("ID, INTERVIEW", id, interview);
    console.log("APPOINTMENT", appointment);

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        console.log("RES", res);
        setState({
          ...state,
          appointments,
        });
      })
      // .catch((err) => {
      //   console.log("ERR", err);
      // });
  }

  function cancelInterview(id) {

    console.log('CANCEL INTERVIEW ')
    
    const updatedAppointment = {
      ...state.appointments[id],
      interview: null,
    };

    return axios
      .delete(`/api/appointments/${id}`, updatedAppointment)
      .then((res) => {
        console.log("RES", res);
        setState({
          ...state,
          updatedAppointment,
        });
      })
      // .catch((err) => {
      //   console.log("ERR", err);
      // });
  }
  
  
  return {state, setDay, bookInterview, cancelInterview};

}

