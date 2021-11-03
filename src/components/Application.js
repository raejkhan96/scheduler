import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersArray = getInterviewersForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    // id is appointment id
    // interview contains interviewer (number) and student name (string)

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

  // FIX: state.appointments.map is not a function
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("INTERVIEW ", interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interviewers={interviewersArray}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* In the schedule <section> of our Application component, map over the appointments array to create a list in the schedule section. */}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
