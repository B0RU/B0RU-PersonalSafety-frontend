import axios from 'axios';

export default {
  GetDepartmentDetails() {
    return axios.get('/api/Agent/Department/GetDepartmentDetails');
  },
  GetOnlineRescuers() {
    return axios.get('/api/Agent/Resucer/GetOnlineRescuers');
  },
  GetDisconnectedRescuers() {
    return axios.get('/api/Agent/Resucer/GetDisconnectedRescuers');
  },
  GetAllRequests() {
    return axios.get('/api/Agent/SOS/GetAllRequests');
  },
  GetPendingRequests() {
    return axios.get('/api/Agent/SOS/GetPendingRequests');
  },
  GetAcceptedRequests() {
    return axios.get('/api/Agent/SOS/GetAcceptedRequests');
  },
  GetSolvedRequests() {
    return axios.get('/api/Agent/SOS/GetSolvedRequests');
  },
  GetCanceledRequests() {
    return axios.get('/api/Agent/SOS/GetCanceledRequests');
  },
  RegisterRescuer(rescuer) {
    return axios.post('/api/Agent/Resucer/RegisterRescuer', rescuer);
  },
  AcceptSOSRequest(requestId, rescuerEmail) {
    return axios.put(`/api/Agent/SOS/AcceptSOSRequest?requestId=${requestId}&rescuerEmail=${rescuerEmail}`);
  },
  ResetSOSRequest(requestId) {
    return axios.put(`/api/Agent/SOS/ResetSOSRequest?requestId=${requestId}`);
  },
};
