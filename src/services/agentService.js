import axios from 'axios';

const token = localStorage.getItem('token');
const agentCall = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default {
  GetDepartmentDetails() {
    return agentCall.get('/api/Agent/Department/GetDepartmentDetails');
  },
  GetOnlineRescuers() {
    return agentCall.get('/api/Agent/Rescuer/GetOnlineRescuers');
  },
  GetDisconnectedRescuers() {
    return agentCall.get('/api/Agent/Rescuer/GetDisconnectedRescuers');
  },
  GetAllAuthorityRequests() {
    return agentCall.get('/api/Agent/SOS/GetAllAuthorityRequests');
  },
  GetAuthorityPendingRequests() {
    return agentCall.get('/api/Agent/SOS/GetAuthorityPendingRequests');
  },
  GetAuthorityAcceptedRequests() {
    return agentCall.get('/api/Agent/SOS/GetAuthorityAcceptedRequests');
  },
  GetAuthoritySolvedRequests() {
    return agentCall.get('/api/Agent/SOS/GetAuthoritySolvedRequests');
  },
  GetAuthorityCanceledRequests() {
    return agentCall.get('/api/Agent/SOS/GetAuthorityCanceledRequests');
  },
  RegisterRescuer(rescuer) {
    return agentCall.post('/api/Agent/Rescuer/RegisterRescuer', rescuer);
  },
  AcceptSOSRequest(requestId, rescuerEmail) {
    return agentCall.put(`/api/Agent/SOS/AcceptSOSRequest?requestId=${requestId}&rescuerEmail=${rescuerEmail}`);
  },
  ResetSOSRequest(requestId) {
    return agentCall.put(`/api/Agent/SOS/ResetSOSRequest?requestId=${requestId}`);
  },
};
