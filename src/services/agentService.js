import axios from 'axios';

export default {
  GetDepartmentDetails() {
    return axios.get('/api/Agent/Department/GetDepartmentDetails');
  },
  GetOnlineRescuers() {
    return axios.get('/api/Agent/Rescuer/GetOnlineRescuers');
  },
  GetDisconnectedRescuers() {
    return axios.get('/api/Agent/Rescuer/GetDisconnectedRescuers');
  },
  GetAllAuthorityRequests() {
    return axios.get('/api/Agent/SOS/GetAllAuthorityRequests');
  },
  GetAuthorityPendingRequests() {
    return axios.get('/api/Agent/SOS/GetAuthorityPendingRequests');
  },
  GetAuthorityAcceptedRequests() {
    return axios.get('/api/Agent/SOS/GetAuthorityAcceptedRequests');
  },
  GetAuthoritySolvedRequests() {
    return axios.get('/api/Agent/SOS/GetAuthoritySolvedRequests');
  },
  GetAuthorityCanceledRequests() {
    return axios.get('/api/Agent/SOS/GetAuthorityCanceledRequests');
  },
  RegisterRescuer(rescuer) {
    return axios.post('/api/Agent/Rescuer/RegisterRescuer', rescuer);
  },
  AcceptSOSRequest(requestId, rescuerEmail) {
    return axios.put(`/api/Agent/SOS/AcceptSOSRequest?requestId=${requestId}&rescuerEmail=${rescuerEmail}`);
  },
  ResetSOSRequest(requestId) {
    return axios.put(`/api/Agent/SOS/ResetSOSRequest?requestId=${requestId}`);
  },
};
