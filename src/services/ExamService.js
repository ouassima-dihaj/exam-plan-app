import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/exams/save";

export const saveExam = (formData) => axios.post(REST_API_BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
}
);