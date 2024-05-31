import React, { useState, useEffect } from "react";
import { getExams } from "../services/ExamService";
import { getSalles } from "../services/SalleService";

const ExamDetailsComponent = () => {
    const [exams, setExams] = useState([]);
    const [examSalles, setExamSalles] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all exams
        getExams()
            .then((response) => {
                setExams(response.data);
                // For each exam, fetch its salles
                response.data.forEach((exam) => {
                    getSalles(exam.idExamen)
                        .then((sallesResponse) => {
                            setExamSalles((prevExamSalles) => ({
                                ...prevExamSalles,
                                [exam.idExamen]: sallesResponse.data,
                            }));
                        })
                        .catch((error) => {
                            console.error("Error fetching salles for exam:", exam.idExamen, error);
                            setError("Failed to fetch salles. Please try again later.");
                        });
                });
            })
            .catch((error) => {
                console.error("Error fetching exams:", error);
                setError("Failed to fetch exams. Please try again later.");
            });
    }, []);

    return (
        <div>
            {exams.map((exam) => (
                <div key={exam.idExamen}>
                    <h3>Exam Details</h3>
                    <p>Date: {exam.date}</p>
                    <p>Duration: {exam.dureeRelle}</p>
                    <p>Teacher: {exam.enseignant}</p>
                    <p>Start Time: {exam.heureDebut}</p>
                    <h4>Salles:</h4>
                    {examSalles[exam.idExamen] ? (
                        examSalles[exam.idExamen].map((salle) => (
                            <div key={salle.idSalle}>
                                <p>{salle.nom}</p>
                            </div>
                        ))
                    ) : (
                        <p>Loading salles...</p>
                    )}
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ExamDetailsComponent;
