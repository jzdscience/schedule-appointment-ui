import React, { useEffect, useState } from 'react';
import { getAppointments } from '../../services/api';

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        async function fetchAppointments() {
            const data = await getAppointments();
            setAppointments(data);
        }
        fetchAppointments();
    }, []);

    return (
        <div>
            <h2>View Appointments</h2>
            <ul>
                {appointments.map((appt) => (
                    <li key={appt.id}>
                        {appt.student_name} - {new Date(appt.start_time).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAppointments;
