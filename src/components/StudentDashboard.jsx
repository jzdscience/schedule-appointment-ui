import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './StudentDashboard.css';

function StudentDashboard() {
  const [professors, setProfessors] = useState([
    { 
      id: 1, 
      name: 'Dr. Smith', 
      officeHours: [
        { day: 'Monday', startTime: new Date().setHours(14, 0), endTime: new Date().setHours(16, 0) },
        { day: 'Wednesday', startTime: new Date().setHours(13, 0), endTime: new Date().setHours(15, 0) }
      ] 
    },
    { 
      id: 2, 
      name: 'Dr. Johnson', 
      officeHours: [
        { day: 'Tuesday', startTime: new Date().setHours(10, 0), endTime: new Date().setHours(12, 0) },
        { day: 'Thursday', startTime: new Date().setHours(15, 0), endTime: new Date().setHours(17, 0) }
      ] 
    },
  ]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [appointment, setAppointment] = useState({ date: null, startTime: null, duration: 15 });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    if (selectedProfessor && appointment.date) {
      const slots = generateAvailableSlots(selectedProfessor.officeHours, appointment.date);
      setAvailableSlots(slots);
    }
  }, [selectedProfessor, appointment.date]);

  const generateAvailableSlots = (officeHours, date) => {
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    const todayOfficeHours = officeHours.find(oh => oh.day === dayOfWeek);
    
    if (!todayOfficeHours) return [];

    const slots = [];
    let currentTime = new Date(todayOfficeHours.startTime);
    const endTime = new Date(todayOfficeHours.endTime);

    while (currentTime < endTime) {
      slots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }

    return slots;
  };

  const bookAppointment = () => {
    if (appointment.date && appointment.startTime) {
      const endTime = new Date(appointment.startTime);
      endTime.setMinutes(endTime.getMinutes() + appointment.duration);
      const newAppointment = {
        id: Date.now(), // use a more robust id in production
        professor: selectedProfessor.name,
        date: appointment.date.toDateString(),
        startTime: appointment.startTime.toLocaleTimeString(),
        endTime: endTime.toLocaleTimeString()
      };
      setUserAppointments([...userAppointments, newAppointment]);
      console.log(`Booking appointment with ${selectedProfessor.name} on ${newAppointment.date} from ${newAppointment.startTime} to ${newAppointment.endTime}`);
      setAppointment({ date: null, startTime: null, duration: 15 });
    }
  };

  const deleteAppointment = (id) => {
    setUserAppointments(userAppointments.filter(app => app.id !== id));
  };

  return (
    <div className="student-dashboard">
      <h2 className="dashboard-title">Student Dashboard</h2>
      <div className="dashboard-content">
        <div className="professor-list">
          <h3 className="section-title">Choose Faculty Members</h3>
          <ul className="professor-items">
            {professors.map((prof) => (
              <li key={prof.id} onClick={() => setSelectedProfessor(prof)} className="professor-item">
                {prof.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedProfessor && (
          <div className="book-appointment">
            <h3 className="section-title">Book Appointment with {selectedProfessor.name}</h3>
            <p className="office-hours">
              Office Hours: 
              {selectedProfessor.officeHours.map((oh, index) => (
                <span key={index}>{oh.day} {new Date(oh.startTime).toLocaleTimeString()} - {new Date(oh.endTime).toLocaleTimeString()}, </span>
              ))}
            </p>
            <form onSubmit={(e) => { e.preventDefault(); bookAppointment(); }} className="appointment-form">
              <DatePicker
                selected={appointment.date}
                onChange={(date) => setAppointment({ ...appointment, date })}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select Date"
                className="form-input"
                required
              />
              <DatePicker
                selected={appointment.startTime}
                onChange={(time) => setAppointment({ ...appointment, startTime: time })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start Time"
                dateFormat="h:mm aa"
                placeholderText="Select Start Time"
                className="form-input"
                includeTimes={availableSlots}
                required
              />
              <select
                value={appointment.duration}
                onChange={(e) => setAppointment({ ...appointment, duration: parseInt(e.target.value) })}
                className="form-input"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
              {appointment.startTime && (
                <p className="appointment-time">
                  Appointment: {appointment.startTime.toLocaleTimeString()} - {
                    new Date(appointment.startTime.getTime() + appointment.duration * 60000).toLocaleTimeString()
                  }
                </p>
              )}
              <button type="submit" className="submit-button">Book Appointment</button>
            </form>
          </div>
        )}
      </div>
      <div className="user-appointments">
        <h3>Your Appointments</h3>
        {userAppointments.length > 0 ? (
          <ul>
            {userAppointments.map((app) => (
              <li key={app.id}>
                {app.professor} on {app.date} from {app.startTime} to {app.endTime}
                <button onClick={() => deleteAppointment(app.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments scheduled.</p>
        )}
      </div>
      <Link to="/history" className="history-link">View Appointment History</Link>
    </div>
  );
}

export default StudentDashboard;