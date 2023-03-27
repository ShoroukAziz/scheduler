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

  function updateDaysSpots(change) {
    const affectedDay = state.days.find((day) => {
      return day.name === state.day;
    });
    const otherDays = state.days.filter((day) => {
      return day.name !== state.day;
    });
    const updatedDay = { ...affectedDay, spots: affectedDay.spots + change };
    const updatedDays = [...otherDays, updatedDay];
    return updatedDays.sort((a, b) => a.id - b.id);
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
    const days = updateDaysSpots(-1);
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
    const days = updateDaysSpots(1);

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({ ...state, appointments, days });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
