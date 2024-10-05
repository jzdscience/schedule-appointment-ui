import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with actual backend URL

export const createSchedule = async (schedule) => {
    return await axios.post(`${API_URL}/schedules`, schedule);
};

export const getAppointments = async () => {
    return await axios.get(`${API_URL}/appointments`);
};

export const bookAppointment = async (appointment) => {
    return await axios.post(`${API_URL}/appointments`, appointment);
};

export const getSchedules = async () => {
    return await axios.get(`${API_URL}/schedules`);
};
