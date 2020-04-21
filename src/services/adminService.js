import axios from 'axios';

const token = localStorage.getItem('token');
const adminCall = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default {
  GetDepartments() {
    return adminCall.get('/api/Admin/GetDepartments');
  },
  RegisterAgent(personnel) {
    return adminCall.post('/api/Admin/RegisterAgent', personnel);
  },
};
