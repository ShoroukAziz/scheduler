/**
 * Gets a list of booked appointments for a specific day
 *
 * @param  {object} state The state object
 * @param  {string} day   the day we want to get appointments for
 * @return {array}        a list of appointments for that day or an empty array if no appointments were found
 */
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find((e) => e.name === day);
  if (!filteredDay) {
    return [];
  }
  const appointments = filteredDay.appointments;

  if (!appointments) {
    return [];
  }

  const appointmentsForDay = Object.values(state.appointments).filter(
    (appointment) => {
      return appointments.includes(appointment.id);
    }
  );
  return appointmentsForDay;
}

/**
 * Gets a full interview object containing the interviewer data and not just the id
 *
 * @param  {object} state       The state object
 * @param  {object} interview   the interview we want to add interviewer data to
 * @return {object}             the complete interview data object
 */
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = Object.values(state.interviewers).find(
    (i) => i.id === interview.interviewer
  );
  const interviewData = { ...interview, interviewer };
  return interviewData;
}

/**
 * Gets a list of available interviewers for a specific day
 *
 * @param  {object} state The state object
 * @param  {string} day   the day we want to get appointments for
 * @return {array}        a list of available interviewers for that day or an empty array if no  interviewers were found
 */
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((e) => e.name === day);
  if (!filteredDay) {
    return [];
  }
  const interviewersIdsForDay = filteredDay.interviewers;

  if (!interviewersIdsForDay) {
    return [];
  }
  const interviewersForDay = Object.values(state.interviewers).filter(
    (interviewer) => {
      return interviewersIdsForDay.includes(interviewer.id);
    }
  );
  return interviewersForDay;
}
