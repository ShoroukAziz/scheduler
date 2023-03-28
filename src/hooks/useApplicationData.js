import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData(initial) {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

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
