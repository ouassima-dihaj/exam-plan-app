import React, { useState, useEffect } from "react";
import { getExams } from "../services/ExamService";
import { getSallesByExam } from "../services/SalleService";
import { getEnseignantByIdSalle } from "../services/EnseignantService";
import { getAdminByIdSalle } from "../services/AdminService";

const ExamDetailsComponent = () => {
    const [exams, setExams] = useState([]);
    const [examSalles, setExamSalles] = useState({});
    const [surveillants, setSurveillants] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all exams
        getExams()
            .then((response) => {
                setExams(response.data);
                // For each exam, fetch its salles
                response.data.forEach((exam) => {
                    getSallesByExam(exam.idExamen)
                        .then((sallesResponse) => {
                            setExamSalles((prevExamSalles) => ({
                                ...prevExamSalles,
                                [exam.idExamen]: sallesResponse.data,
                            }));
                            // For each salle, fetch surveillants
                            sallesResponse.data.forEach((salle) => {
                            //fetch surveillants
                                getEnseignantByIdSalle(salle.idSalle)
                                    .then((response) => {
                                        setSurveillants((prevSurveillants) => ({
                                            ...prevSurveillants,
                                            [salle.idSalle]: response.data,
                                        }));
                                    })
                                    .catch((error) => {
                                        console.error("Error fetching surveillants for salle:", salle.idSalle, error);
                                        setError("Failed to fetch surveillants. Please try again later.");
                                });
                                //fetch admins
                                getAdminByIdSalle(salle.idSalle)
                                .then((response) => {
                                    setAdmins((prevseAdmins) => ({
                                        ...prevseAdmins,
                                        [salle.idSalle]: response.data,
                                    }));
                                })
                                .catch((error) => {
                                    console.error("Error fetching admins for salle:", salle.idSalle, error);
                                    setError("Failed to fetch admins. Please try again later.");
                            });
                            });
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
                                <h5>Surveillants:</h5>
                                {surveillants[salle.idSalle] ? (
                                    surveillants[salle.idSalle].map((surveillant, index) => (
                                        <p key={index}>{surveillant.nom}</p>
                                    ))
                                ) : (
                                    <p>Loading surveillants...</p>
                                )}
                                <h5>Admins:</h5>
                                {admins[salle.idSalle] ? (
                                    admins[salle.idSalle].map((admin, index) => (
                                        <p key={index}>{admin.nom}</p>
                                    ))
                                ) : (
                                    <p>Loading admins...</p>
                                )}
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
