import { useEffect, useState } from "react";
import React from 'react'
import { saveEnseignant } from "../services/EnseignantService";
import { getDepartements } from "../services/DepartementService";
import { getFilieres} from "../services/FiliereService";
import { getGroupes } from "../services/GroupeService";

function EnseignantComponent() {
    const [idDepartement, setIdDepartement] = useState(null);
    const [idFiliere, setIdFiliere] = useState(null);
    const [idGroupe, setIdGroupe] = useState(null);
    const [idSalle, setIdSalle] = useState(null);
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [error, setError] = useState(null);
    const [departements, setDepartements] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [groupes, setGroupes] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            idDepartment: idDepartement,
            idFiliere: idFiliere,
            idGroupe: idGroupe,
            email: email,
            nom: nom,
            prenom: prenom
        };

        saveEnseignant(formData)
        .then((response) => {
          console.log("Form data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          setError("Failed to save exam. Please check your input and try again.");
        });
      };
      useEffect(() => {
        getDepartements()
        .then((response) => {
            setDepartements(response.data);
        })
        .catch((error) => {
          console.error("Error fetching departemennts:", error);
          setError("Failed to fetch semestres. Please try again later.");
        });
      }
      ,[])
      useEffect(() => {
        getFilieres()
        .then((response) => {
            setFilieres(response.data);
        })
        .catch((error) => {
          console.error("Error fetching filieres:", error);
          setError("Failed to fetch semestres. Please try again later.");
        });
      }
      ,[])
      useEffect(() => {
        getGroupes()
        .then((response) => {
            setGroupes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching groupes:", error);
          setError("Failed to fetch semestres. Please try again later.");
        });
      }
      ,[])
  return (
    <div>
       <form onSubmit={handleSubmit}>
            
            <div>
                <label>Nom</label>
                <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
            <div>
                <label>Prenom</label>
                <input type="text" name="prenom" value={prenom}  onChange={(e) => setPrenom(e.target.value)} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Department</label>
                <select name="department_id" value={idDepartement} onChange={(e) => setIdDepartement(e.target.value)}>
                    <option value="">Select Department</option>
                    {departements.map((item) => (
                    <option key={item.idDepartment} value={item.idDepartment}>
                    {item.nomDepartment}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Filiere</label>
                <select name="filiere_id" value={idFiliere} onChange={(e) => setIdFiliere(e.target.value)}>
                    <option value="">Select Filiere</option>
                    {filieres.map((item) => (
                    <option key={item.idFiliere} value={item.idFiliere}>
                    {item.nomFiliere}
                    </option>
                    ))}
                </select>
            </div>


            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default EnseignantComponent
