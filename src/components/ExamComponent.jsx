import React, { useState, useEffect } from "react";
import { saveExam } from "../services/ExamService";
import { getSemestres } from "../services/SemestreService";
import { getSalles } from "../services/SalleService";
import { getGroupes } from "../services/GroupeService";
import { getAdmins } from "../services/AdminService";

function ExamComponent() {
  const [idSemestre, setIdSemestre] = useState(null);
  const [semestres, setSemestres] = useState([]);
  const [idSession, setIdSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [type, setType] = useState("");
  const [idCoordonnateur, setIdCoordonnateur] = useState(null);
  const [coordonnateurs, setCoordonnateurs] = useState([]);
  const [idelementPedagogique, setIdElementPedagogique] = useState(null);
  const [elementPedagogiques, setElementPedagogiques] = useState([]);
  const [idSalle, setIdSalle] = useState(null);
  const [salles, setSalles] = useState([]);
  const [idGroupe, setIdGroupe] = useState(null);
  const [groupes, setGroupes] = useState([]);
  const [selectedSalles, setSelectedSalles] = useState([]);
  const [date, setDate] = useState(null);
  const [heureDebut, setHeureDebut] = useState(null);
  const [dureePrevue, setDureePrevue] = useState(null);
  const [dureeRelle, setDureeRelle] = useState(null);
  const [rapportTextuelle, setRapportTextuelle] = useState(null);
  const [error, setError] = useState(null);
  const [epreuve, setEpreuve] = useState(null);
  const [pv, setPv] = useState(null);
  const [surveillantCount, setSurveillantCount] = useState(null);
  const [admins, setAdmins] = useState([]);

  const handleSalleChange = (salleId, salleName) => {
    const surveillantCount = document.getElementById(
      `salle_${salleId}_invigilators`
    ).value;
    // const idAdmin = document.getElementById(`admin_${salleId}`).value;

    setSelectedSalles((prevSelectedSalles) => {
      const index = prevSelectedSalles.findIndex(
        (salle) => salle.idSalle === salleId
      );
      if (index === -1) {
        return [
          ...prevSelectedSalles,
          {
            idSalle: salleId,
            nom: salleName,
            surveillantCount: surveillantCount,
            // admin: { idPersonnel: idAdmin },
          },
        ];
      } else {
        const updatedSalles = [...prevSelectedSalles];
        updatedSalles[index].surveillantCount = surveillantCount;
        // updatedSalles[index].admin.idPersonnel = idAdmin;
        return updatedSalles;
      }
    });
  };

  const handleSurveillantCountChange = (salleId, surveillantCount) => {
    setSelectedSalles((prevSelectedSalles) => {
      const index = prevSelectedSalles.findIndex(
        (salle) => salle.idSalle === salleId
      );
      if (index !== -1) {
        const updatedSalles = [...prevSelectedSalles];
        updatedSalles[index].surveillantCount = surveillantCount;
        return updatedSalles;
      }
      return prevSelectedSalles;
    });
  };

  const handleAdminChange = (salleId, idAdmin) => {
    setSelectedSalles((prevSelectedSalles) => {
      const index = prevSelectedSalles.findIndex(
        (salle) => salle.idSalle === salleId
      );
      if (index !== -1) {
        const updatedSalles = [...prevSelectedSalles];
        updatedSalles[index].admin.idPersonnel = idAdmin;
        return updatedSalles;
      }
      return prevSelectedSalles;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idSemestre", idSemestre);
    formData.append("date", date);
    formData.append("heureDebut", heureDebut);
    formData.append("dureePrevue", dureePrevue);
    formData.append("dureeRelle", dureeRelle);
    formData.append("rapportTextuelle", rapportTextuelle);
    formData.append("epreuve", epreuve);
    formData.append("pv", pv);
    formData.append("salles", JSON.stringify(selectedSalles));
    formData.append("idGroupe", idGroupe);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    saveExam(formData)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setError("Failed to save exam. Please check your input and try again.");
      });
  };

  useEffect(() => {
    getSemestres()
      .then((response) => {
        setSemestres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching semestres:", error);
        setError("Failed to fetch semestres. Please try again later.");
      });
  }, []);

  useEffect(() => {
    getSalles()
      .then((response) => {
        setSalles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching salles:", error);
        setError("Failed to fetch salles. Please try again later.");
      });
  }, []);

  useEffect(() => {
    getGroupes()
      .then((response) => {
        setGroupes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groupes:", error);
        setError("Failed to fetch groupes. Please try again later.");
      });
  }, []);

  /*
  useEffect(() => {
    getAdmins()
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
        setError("Failed to fetch admins. Please try again later.");
      });
  }, []);
 */

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
        <label htmlFor="salles">Salles</label>
        <br />
        {salles.map((item) => (
          <div key={item.idSalle}>
            <input
              type="checkbox"
              id={`salle_${item.idSalle}`}
              name="salles[]"
              value={item.idSalle}
              onChange={() => handleSalleChange(item.idSalle, item.nom)}
            />
            <label htmlFor={`salle_${item.idSalle}`}>{item.nom}</label>
            <input
              type="number"
              id={`salle_${item.idSalle}_invigilators`}
              name={`salle_${item.idSalle}_invigilators`}
              defaultValue="2"
              min="1"
              onChange={(e) =>
                handleSurveillantCountChange(item.idSalle, e.target.value)
              }
            />
            {/*
              <select
          id={`admin_${item.idSalle}`}
          onChange={(e) => handleAdminChange(item.idSalle, e.target.value)}
        >
          <option value="">Select Admin</option>
          {admins.map((admin) => (
            <option key={admin.idPersonnel} value={admin.idPersonnel}>
              {admin.nom}
            </option>
          ))}
        </select>
           */}
          </div>
        ))}
        <br />
        <label htmlFor="Groupes">Groupes</label>
        <br />
        {groupes.map((item) => (
          <div key={item.idGroupe}>
            <input
              type="checkbox"
              id={`groupe_${item.idGroupe}`}
              name="groupes[]"
              value={item.idGroupe}
              onChange={(e) => {
                if (e.target.checked) {
                  setIdGroupe(e.target.value);
                } else {
                  setIdGroupe(null); // Set idGroupe to null when checkbox is unchecked
                }
              }}
            />
            <label htmlFor={`groupe_${item.idGroupe}`}>{item.nom}</label>
          </div>
        ))}
        <br />
        <label htmlFor="epreuve">Epreuve:</label>
        <input
          type="file"
          id="epreuve"
          name="epreuve"
          onChange={(e) => {
            setEpreuve(e.target.files[0]);
          }}
        />
        <br />
        <br />
        <label htmlFor="pv">PV:</label>
        <input
          type="file"
          id="pv"
          name="pv"
          onChange={(e) => {
            setPv(e.target.files[0]);
          }}
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
