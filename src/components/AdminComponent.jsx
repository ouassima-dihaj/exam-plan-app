import { useEffect, useState } from "react";
import React from 'react'
import { saveAdmin } from "../services/AdminService";

function AdminComponent() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nom: nom,
            prenom: prenom
        };

        saveAdmin(formData)
        .then((response) => {
          console.log("Form data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          setError("Failed to save exam. Please check your input and try again.");
        });
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
                <input type="text" name="prenom" value={prenom}  onChange={(e) => setPrenom(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AdminComponent
