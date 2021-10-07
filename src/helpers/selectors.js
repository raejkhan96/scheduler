// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
 
  const daysObj = state.days.filter(days => days.name === day);
  // console.log(daysObj);
  const apptObjectsArray = [];
  if (daysObj.length === 0) {
    return apptObjectsArray; 
  }
  else {
    for (let i = 0; i < daysObj[0].appointments.length; i++) {
      apptObjectsArray.push(state.appointments[daysObj[0].appointments[i]])
    }
    // console.log(apptObjectsArray);
    return (apptObjectsArray);
  }
}
  
export function getInterview(state, interview) {
 
  if (interview === null) {
    return null;
  }
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];
  const student = interview.student;

  return {student, interviewer};
  
}

export function getInterviewersForDay(state, day) {

  const daysObj = state.days.filter(days => days.name === day);
  // console.log('DAYS OBJ', daysObj);
  // console.log('STATE', state)
  const interviewerObjectsArray = [];
  if (daysObj.length === 0) {
    return interviewerObjectsArray; 
  }
  else {
    for (let i = 0; i < daysObj[0].interviewers.length; i++) {
      interviewerObjectsArray.push(state.interviewers[daysObj[0].interviewers[i]])
    }
    // console.log(apptObjectsArray);
    return (interviewerObjectsArray);
  }

}