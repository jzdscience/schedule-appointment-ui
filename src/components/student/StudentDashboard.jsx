import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    return (
        <div>
            <h1>Student Dashboard</h1>
            <ul>
                <li><Link to="/student/book-appointment">Book Appointment</Link></li>
                <li><Link to="/student/view-schedules">View Schedules</Link></li>
            </ul>
        </div>
    );
};

export default StudentDashboard;
