import axios from 'axios';

export default {
  RegisterAgent(personnel) {
    return axios.post('/api/Admin/Registration/RegisterAgent', personnel);
  }, //  {"fullName": "John Doe", "email": "john@test.com", "password": "fjKdl1P-mD", "departmentCity": 0, "departmentLongitude": 30.123456012, "departmentLatitude": 30.123456012, "authorityType": 1}
  RegisterManager(manager) {
    return axios.post('/api/Admin/Registration/RegisterManager', manager);
  }, // {"fullName": "string","email": "user@example.com","password": "string","distributionId": 0}
  ModifyManagerAccess(manager) {
    return axios.put('/api/Admin/Registration/ModifyManagerAccess', manager);
  }, // {"email": "user@example.com", "distributionId": 0}
  GetDistributionTree() {
    return axios.get('/api/Admin/Management/GetDistributionTree');
  },
  GetDistributionNodes() {
    return axios.get('/api/Admin/Management/GetDistributionNodes');
  },
  GetDistributionCities() {
    return axios.get('/api/Admin/Management/GetDistributionCities');
  },
  AddNewDistribution(distribution) {
    return axios.post('/api/Admin/Management/AddNewDistribution', distribution);
  }, // {"parentId": 0,"value": "string"}
  RenameDistribution(distribution) {
    return axios.put('/api/Admin/Management/RenameDistribution', distribution);
  }, // {"id": 0, "value": "string"}
  RetrieveTrackers() {
    return axios.get('/api/Admin/Technical/RetrieveTrackers');
  },
  RetrieveConsole() {
    return axios.get('/api/Admin/Technical/RetrieveConsole');
  },
  ResetTrackers() {
    return axios.put('/api/Admin/Technical/ResetTrackers');
  },
  ResetConsole() {
    return axios.put('/api/Admin/Technical/ResetConsole');
  },
  ResetClientState(clientEmail) {
    return axios.put(`/api/Admin/Technical/ResetClientState?clientEmail=${clientEmail}`);
  },
  ResetRescuerState(rescuerEmail) {
    return axios.put(`/api/Admin/Technical/ResetRescuerState?rescuerEmail=${rescuerEmail}`);
  },
};
