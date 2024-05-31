import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/admins";

export const getAdmins = () => axios.get(REST_API_BASE_URL+"/nullSalle");