import React, { useState, useEffect } from 'react';
import { updateEnseignant, getEnseignantById } from '../services/EnseignantService';
import { getDepartements } from "../services/DepartementService";
import { getFilieres } from "../services/FiliereService";
import { getGroupes } from "../services/GroupeService";

function UpdateEnseignantComponent({ enseignantId, onUpdateSuccess, onCancel }) {
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

    useEffect(() => {
        getDepartements()
            .then((response) => {
                setDepartements(response.data);
            })
            .catch((error) => {
                console.error("Error fetching departements:", error);
            });
    }, []);

    useEffect(() => {
        getFilieres()
            .then((response) => {
                setFilieres(response.data);
            })
            .catch((error) => {
                console.error("Error fetching filieres:", error);
            });
    }, []);

    useEffect(() => {
        getGroupes()
            .then((response) => {
                setGroupes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching groupes:", error);
            });
    }, []);

    useEffect(() => {
        const fetchEnseignant = async () => {
            try {
                const response = await getEnseignantById(enseignantId);
                const enseignant = response.data;
                setIdDepartement(enseignant.idDepartment);
                setIdFiliere(enseignant.idFiliere);
                setIdGroupe(enseignant.idGroupe);
                setIdSalle(enseignant.idSalle);
                setEmail(enseignant.email);
                setNom(enseignant.nom);
                setPrenom(enseignant.prenom);
            } catch (error) {
                console.error('Error fetching enseignant data:', error);
                setError('Error fetching enseignant data');
            }
        };

        fetchEnseignant();
    }, [enseignantId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            idDepartment: idDepartement,
            idFiliere: idFiliere,
            idGroupe: idGroupe,
            idSalle: idSalle,
            email: email,
            nom: nom,
            prenom: prenom
        };

        console.log('Submitting form data:', formData);

        try {
            const response = await updateEnseignant(enseignantId, formData);

            if (response.status === 200) {
                onUpdateSuccess();
            } else {
                setError('Failed to update enseignant. Unexpected response from the server.');
            }
        } catch (error) {
            console.error('Error updating enseignant:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div>
                    <label>Prenom</label>
                    <input type="text" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Department</label>
                    <select name="department_id" value={idDepartement || ''} onChange={(e) => setIdDepartement(e.target.value)}>
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
                    <select name="filiere_id" value={idFiliere || ''} onChange={(e) => setIdFiliere(e.target.value)}>
                        <option value="">Select Filiere</option>
                        {filieres.map((item) => (
                            <option key={item.idFiliere} value={item.idFiliere}>
                                {item.nomFiliere}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Groupe</label>
                    <select name="groupe_id" value={idGroupe || ''} onChange={(e) => setIdGroupe(e.target.value)}>
                        <option value="">Select Groupe</option>
                        {groupes.map((item) => (
                            <option key={item.idGroupe} value={item.idGroupe}>
                                {item.nomGroupe}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default UpdateEnseignantComponent;
