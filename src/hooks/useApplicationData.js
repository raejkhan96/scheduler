import React, { useEffect, useState } from "react";
import axios from "axios";

// Create a transition function within useVisualMode 
// that will take in a new mode and update the mode state with the new value

export default function useApplicationData() {
  
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

  const setDay = (day) => setState({ ...state, day });

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
      console.log('STATE', state);
    });
  }, []);

  function updateSpots(appointments, day) {
    
    let spots = 0;
    const appForDay = state.days.find(x => x.name === day).appointments

    for (const app of appForDay) {
      if (!appointments[app].interview) {
        spots += 1;
      }
    }

    const days = state.days.map(x => x.name === day ? {...x, spots} : x);

    return days
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newDays = updateSpots(appointments, state.day);

    console.log("ID, INTERVIEW", id, interview);
    console.log("APPOINTMENT", appointment);

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        console.log("RES", res);
        setState({
          ...state,
          appointments,
          days: newDays
        });
      })

  }

  function cancelInterview(id) {

    console.log('CANCEL INTERVIEW ')
    
    // updated needs now to update the appointments array
    const updatedAppointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: updatedAppointment,
    };

    const newDays = updateSpots(appointments, state.day);

    return axios
      .delete(`/api/appointments/${id}`, updatedAppointment)
      .then((res) => {
        console.log("RES", res);
        setState({
          ...state,
          appointments: appointments,
          days: newDays
        });
      })
  }
  
 
  return {state, setDay, bookInterview, cancelInterview};

}

