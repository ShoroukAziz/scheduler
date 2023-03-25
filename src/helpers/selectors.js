export function getAppointmentsForDay(state, day) {


  const filteredDay = state.days.find(e => e.name === day);
  if (!filteredDay) {
    return [];
  }
  const appointments = filteredDay.appointments;

  if (!appointments) {
    return []
  }

  const appointmentsForDay = Object.values(state.appointments).filter(appointment => {
    return appointments.includes(appointment.id)
  });
  return appointmentsForDay;

}


export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const interviewer = Object.values(state.interviewers).find(i => i.id === interview.interviewer);
  const interviewData = { ...interview, interviewer }
  return interviewData;

}

export function getInterviewersForDay(state, day) {

  const filteredDay = state.days.find(e => e.name === day);
  if (!filteredDay) {
    return [];
  }
  const interviewersIdsForDay = filteredDay.interviewers;

  if (!interviewersIdsForDay) {
    return []
  }
  const interviewersForDay = Object.values(state.interviewers).filter(interviewer => {
    return interviewersIdsForDay.includes(interviewer.id)
  });
  return interviewersForDay;

}