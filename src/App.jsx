// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProfessorDashboard from './components/professor/ProfessorDashboard';
import CreateSchedule from './components/professor/CreateSchedule';
import ViewAppointments from './components/professor/ViewAppointments';
import StudentDashboard from './components/student/StudentDashboard';
import BookAppointment from './components/student/BookAppointment';
import ViewSchedules from './components/student/ViewSchedules';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/professor/create-schedule" component={CreateSchedule} />
                <Route path="/professor/view-appointments" component={ViewAppointments} />
                <Route path="/professor" component={ProfessorDashboard} />
                <Route path="/student/book-appointment" component={BookAppointment} />
                <Route path="/student/view-schedules" component={ViewSchedules} />
                <Route path="/student" component={StudentDashboard} />
                <Route path="/" exact component={() => <h1>Home Page</h1>} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App
