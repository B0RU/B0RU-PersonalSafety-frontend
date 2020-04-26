import axios from 'axios';


export default {
  GetDepartments() {
    return axios.get('/api/Admin/GetDepartments');
  },
  RegisterAgent(personnel) {
    return axios.post('/api/Admin/RegisterAgent', personnel);
  },
};
