import React, { useEffect, useState } from 'react';
import { getSchedules } from '../../services/api';

const ViewSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        async function fetchSchedules() {
            const data = await getSchedules();
            setSchedules(data);
        }
        fetchSchedules();
    }, []);

    return (
        <div>
            <h2>View Schedules</h2>
            <ul>
                {schedules.map((schedule) => (
                    <li key={schedule.id}>
                        {schedule.course_name} - {new Date(schedule.start_time).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewSchedules;
