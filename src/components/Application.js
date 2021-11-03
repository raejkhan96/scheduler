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
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const interviewersArray = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
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
