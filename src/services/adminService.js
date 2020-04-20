import axios from 'axios';

const adminCall = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default {
  GetDepartments() {
    return adminCall.get('/api/Admin/GetDepartments');
  },
  RegisterAgent() {
    return adminCall.post('/api/Admin/RegisterAgent');
  },
};
