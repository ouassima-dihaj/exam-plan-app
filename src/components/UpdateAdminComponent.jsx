import React, { useState, useEffect } from 'react';
import { updateEnseignant, getEnseignantById } from '../services/EnseignantService';
import { getDepartements } from "../services/DepartementService";
import { getFilieres } from "../services/FiliereService";
import { getGroupes } from "../services/GroupeService";

function UpdateEnseignantComponent({ enseignantId, onUpdateSuccess, onCancel }) {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchEnseignant = async () => {
            try {
                const response = await getEnseignantById(enseignantId);
                const enseignant = response.data;
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
            nom: nom,
            prenom: prenom
        };

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
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default UpdateEnseignantComponent;
