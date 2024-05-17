import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/examens";

export const saveExam = (exam) => axios.post(REST_API_BASE_URL, exam);