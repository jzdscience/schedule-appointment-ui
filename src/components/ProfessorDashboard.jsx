import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './ProfessorDashboard.css';

function ProfessorDashboard() {
  const [officeHours, setOfficeHours] = useState([]);
  const [newOfficeHour, setNewOfficeHour] = useState({ id: null, day: '', startTime: '', endTime: '' });
  const [isEditing, setIsEditing] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const addOrUpdateOfficeHour = () => {
    if (newOfficeHour.day && newOfficeHour.startTime && newOfficeHour.endTime) {
      if (isEditing) {
        setOfficeHours(officeHours.map(oh => oh.id === newOfficeHour.id ? newOfficeHour : oh));
        setIsEditing(false);
      } else {
        setOfficeHours([...officeHours, { ...newOfficeHour, id: Date.now() }]);
      }
      setNewOfficeHour({ id: null, day: '', startTime: '', endTime: '' });
    }
  };

  const editOfficeHour = (oh) => {
    setNewOfficeHour(oh);
    setIsEditing(true);
  };

  const deleteOfficeHour = (id) => {
    setOfficeHours(officeHours.filter(oh => oh.id !== id));
  };

  return (
    <div className="professor-dashboard">
      <h2>Professor Dashboard</h2>
      <div className="office-hours">
        <h3>Office Hours</h3>
        <ul>
          {officeHours.map((oh) => (
            <li key={oh.id}>
              {oh.day}: {oh.startTime.toLocaleTimeString()} - {oh.endTime.toLocaleTimeString()}
              <button onClick={() => editOfficeHour(oh)}>Edit</button>
              <button onClick={() => deleteOfficeHour(oh.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form className="add-office-hour" onSubmit={(e) => { e.preventDefault(); addOrUpdateOfficeHour(); }}>
          <select
            value={newOfficeHour.day}
            onChange={(e) => setNewOfficeHour({ ...newOfficeHour, day: e.target.value })}
            required
          >
            <option value="">Select Day</option>
            {days.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
          <DatePicker
            selected={newOfficeHour.startTime}
            onChange={(time) => setNewOfficeHour({ ...newOfficeHour, startTime: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Start Time"
            dateFormat="h:mm aa"
            placeholderText="Select Start Time"
            required
          />
          <DatePicker
            selected={newOfficeHour.endTime}
            onChange={(time) => setNewOfficeHour({ ...newOfficeHour, endTime: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="End Time"
            dateFormat="h:mm aa"
            placeholderText="Select End Time"
            required
          />
          <button type="submit">{isEditing ? 'Update' : 'Add'} Office Hour</button>
        </form>
      </div>
      <Link to="/history">View Appointment History</Link>
    </div>
  );
}

export default ProfessorDashboard;