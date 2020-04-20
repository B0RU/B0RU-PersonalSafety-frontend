import axios from 'axios';

const agentCall = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  RegisterRescuer() {
    return agentCall.post('/api/Agent/Rescuer/RegisterRescuer');
  },
  AcceptSOSRequest() {
    return agentCall.put('/api/Agent/SOS/AcceptSOSRequest');
  },
  ResetSOSRequest() {
    return agentCall.get('/api/Agent/SOS/ResetSOSRequest');
  },

};
