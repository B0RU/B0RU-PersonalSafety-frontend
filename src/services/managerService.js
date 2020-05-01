import axios from 'axios';

export default {
  GetDepartments() {
    return axios.get('/api/Manager/GetDepartments');
  },
  GetDepartmentRequests(departmentId) {
    return axios.get(`/api/Manager/GetDepartmentRequests?departmentId=${departmentId}`);
  },
};
