import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });

  // Sets the default state of the app
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Retrieves all the data needed from the API
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  /**
   * Updates the number of spots remaining after booking or cancelling an appointment
   *
   * @param {object} state   The state object
   * @param {number} change  the change in the spots either -1 when booking a new appointment or +1 when cancelling
   * @return {array}         a new days array with the spots updated
   */
  function updateSpots(state, change) {
    const affectedDayIndex = state.days.findIndex((day) => {
      return day.name === state.day;
    });
    const affectedDay = state.days[affectedDayIndex];
    const updatedDay = { ...affectedDay, spots: affectedDay.spots + change };
    const updatedDays = [...state.days];
    updatedDays[affectedDayIndex] = updatedDay;
    return updatedDays;
  }

  /**
   * Books and updates a new Interview
   *
   * @param  {number} id         the appointment slot ID
   * @param  {object} interview  the newly created interview object
   * @param  {boolean} update    to indicate whether we're booking a new interview or updating an existing one
   * @return {promise}           a promise that resolves after creating or updating the interview
   */
  function bookInterview(id, interview, update = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = !update ? updateSpots(state, -1) : state.days;

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({ ...state, appointments, days });
    });
  }

  /**
   * Cancels an Interview
   *
   * @param  {number} id         the appointment slot ID
   * @return {promise}           a promise that resolves after cancelling the interview
   */
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state, 1);

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({ ...state, appointments, days });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
