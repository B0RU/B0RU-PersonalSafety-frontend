import axios from 'axios';

export default {
  GetDepartments() {
    return axios.get('/api/Manager/Departments/GetDepartments');
  },
  GetDepartmentRequests(departmentId) {
    return axios.get(`/api/Manager/Departments/GetDepartmentRequests?departmentId=${departmentId}`);
  },
  GetTopCardsData() {
    return axios.get('/api/Manager/Stats/GetTopCardsData');
  },
  GetSOSPieData() {
    return axios.get('/api/Manager/Stats/GetSOSPieData');
  },
  GetSOSChartData() {
    return axios.get('/api/Manager/Stats/GetSOSChartData');
  },
  GetEvents() {
    return axios.get('/api/Manager/Events/GetEvents');
  },
  ValidateEvent(eventId) {
    return axios.put(`/api/Manager/Events/ValidateEvent?eventId=${eventId}`);
  },
  InvalidateEvent(eventId) {
    return axios.put(`/api/Manager/Events/InvalidateEvent?eventId=${eventId}`);
  },
};
