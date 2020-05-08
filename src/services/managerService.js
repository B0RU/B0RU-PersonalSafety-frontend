import axios from 'axios';

export default {
  GetDepartments() {
    return axios.get('/api/Manager/Departments/GetDepartments');
  },
  GetDepartmentRequests(departmentId) {
    return axios.get(`/api/Manager/Departments/GetDepartmentRequests?departmentId=${departmentId}`);
  },
};
