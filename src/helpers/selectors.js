export function getAppointmentsForDay(state, day) {


  const filteredDay = state.days.filter(e => e.name === day)[0];
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