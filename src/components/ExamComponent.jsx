import React, { useState, useEffect } from "react";
import { saveExam } from "../services/ExamService";
import { getSemestres } from "../services/SemestreService";

function ExamComponent() {
  const [idSemestre, setIdSemestre] = useState(null);
  const [semestres, setSemestres] = useState([]);
  const [date, setDate] = useState(null);
  const [heureDebut, setHeureDebut] = useState(null);
  const [dureePrevue, setDureePrevue] = useState(null);
  const [dureeRelle, setDureeRelle] = useState(null);
  const [rapportTextuelle, setRapportTextuelle] = useState(null);
  const [error, setError] = useState(null); // State to capture and display errors

  const handleSubmit = (e) => {
    e.preventDefault();
    const examData = {
      idSemestre: idSemestre,
      date,
      heureDebut,
      dureePrevue,
      dureeRelle,
      rapportTextuelle,
    };

    console.log("Submitting exam data:", examData);

    saveExam(examData)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        // Reset form fields or handle success action
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setError("Failed to save exam. Please check your input and try again."); // Set error message for display
      });
  };

  useEffect(() => {
    // Fetch semestres data from API when component mounts
    getSemestres()
      .then((response) => {
        setSemestres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching semestres:", error);
        setError("Failed to fetch semestres. Please try again later."); // Set error message for display
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="semestre">Semestre:</label>
        <select
          className="form-select"
          value={idSemestre}
          onChange={(e) => setIdSemestre(e.target.value)}
        >
          <option value="">Select Semestre</option>
          {semestres.map((item) => (
            <option key={item.idSemestre} value={item.idSemestre}>
              {item.intitule}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="heure_debut">Heure de début:</label>
        <input
          type="time"
          id="heure_debut"
          name="heure_debut"
          value={heureDebut}
          onChange={(e) => setHeureDebut(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="duree_prevue">Durée prévue (en minutes):</label>
        <input
          type="number"
          id="duree_prevue"
          name="duree_prevue"
          value={dureePrevue}
          onChange={(e) => setDureePrevue(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="duree_reelle">Durée réelle (en minutes):</label>
        <input
          type="number"
          id="duree_reelle"
          name="duree_reelle"
          value={dureeRelle}
          onChange={(e) => setDureeRelle(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="rapport">Rapport textuel:</label>
        <br />
        <textarea
          id="rapport"
          name="rapport"
          rows="4"
          cols="50"
          value={rapportTextuelle}
          onChange={(e) => setRapportTextuelle(e.target.value)}
        />
        <br />
        <br />

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ExamComponent;
 