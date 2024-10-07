import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Here you would typically make an API call to fetch the appointment history
    const dummyAppointments = [
      { id: 1, professor: 'Dr. Smith', student: 'John Doe', date: '2023-04-15', startTime: '14:00', endTime: '14:30' },
      { id: 2, professor: 'Dr. Johnson', student: 'Jane Smith', date: '2023-04-16', startTime: '10:30', endTime: '11:00' },
    ];
    setAppointments(dummyAppointments);
  }, []);

  return (
    <div className="appointment-history">
      <h2>Appointment History</h2>
      <table>
        <thead>
          <tr>
            <th>Professor</th>
            <th>Student</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.professor}</td>
              <td>{appointment.student}</td>
              <td>{appointment.date}</td>
              <td>{appointment.startTime}</td>
              <td>{appointment.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}

export default AppointmentHistory;