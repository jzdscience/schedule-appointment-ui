import React, { useState } from 'react';
import { createSchedule } from '../../services/api';

const CreateSchedule = () => {
    const [courseId, setCourseId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const schedule = {
            course_id: courseId,
            start_time: startTime,
            end_time: endTime,
            location
        };
        try {
            await createSchedule(schedule);
            alert('Schedule created successfully!');
        } catch (error) {
            alert('Failed to create schedule');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Schedule</h2>
            <label>Course ID</label>
            <input value={courseId} onChange={(e) => setCourseId(e.target.value)} />
            <label>Start Time</label>
            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label>End Time</label>
            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <label>Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateSchedule;
