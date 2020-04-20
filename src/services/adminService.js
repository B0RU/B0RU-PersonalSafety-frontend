import axios from 'axios';

const adminCall = axios.create();

export default {
  GetDepartments() {
    return adminCall.get('/api/Admin/GetDepartments');
  },
  RegisterAgent() {
    return adminCall.post('/api/Admin/RegisterAgent');
  },
};
