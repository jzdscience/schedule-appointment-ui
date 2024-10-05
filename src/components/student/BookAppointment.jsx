import React, { useState } from 'react';
import { bookAppointment } from '../../services/api';

const BookAppointment = () => {
    const [scheduleId, setScheduleId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointment = {
            schedule_id: scheduleId,
            start_time: startTime,
            end_time: endTime
        };
        try {
            await bookAppointment(appointment);
            alert('Appointment booked successfully!');
        } catch (error) {
            alert('Failed to book appointment');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Appointment</h2>
            <label>Schedule ID</label>
            <input value={scheduleId} onChange={(e) => setScheduleId(e.target.value)} />
            <label>Start Time</label>
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label>End Time</label>
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <button type="submit">Book</button>
        </form>
    );
};

export default BookAppointment;
