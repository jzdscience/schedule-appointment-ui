import React from 'react';
import { Link } from 'react-router-dom';

const ProfessorDashboard = () => {
    return (
        <div>
            <h1>Professor Dashboard</h1>
            <ul>
                <li><Link to="/professor/create-schedule">Create Schedule</Link></li>
                <li><Link to="/professor/view-appointments">View Appointments</Link></li>
            </ul>
        </div>
    );
};

export default ProfessorDashboard;
