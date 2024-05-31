import React, { useState, useEffect } from "react";
import {
  addElementPedagogique,
  fetchAllElementsPedagogiques,
  fetchEnseignants,
  deleteElementPedagogique,
  updateElementPedagogique,
} from "../services/ElemPedagogieService";

const ElementPedagogiquePage = () => {
  const [elements, setElements] = useState([]);
  const [titre, setTitre] = useState("");
  const [niveau, setNiveau] = useState("");
  const [type, setType] = useState("");
  const [enseignantId, setEnseignantId] = useState("");
  const [enseignants, setEnseignants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentElementId, setCurrentElementId] = useState(null);

  useEffect(() => {
    fetchAllElementsPedagogiques()
      .then((response) => {
        setElements(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the elements!", error);
      });

    fetchEnseignants()
      .then((response) => {
        setEnseignants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the enseignants!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newElement = {
      titre,
      niveau,
      type,
      enseignant: { idPersonnel: enseignantId },
    };

    if (isEditing) {
      updateElementPedagogique(currentElementId, newElement)
        .then((response) => {
          console.log(
            "Element Pedagogique updated successfully",
            response.data
          );
          const updatedElements = elements.map((element) =>
            element.idElemPedagogique === currentElementId
              ? response.data
              : element
          );
          setElements(updatedElements);
          resetForm();
        })
        .catch((error) => {
          console.error(
            "There was an error updating the Element Pedagogique!",
            error
          );
        });
    } else {
      addElementPedagogique(newElement)
        .then((response) => {
          console.log("Element Pedagogique added successfully", response.data);
          setElements([...elements, response.data]);
          resetForm();
        })
        .catch((error) => {
          console.error(
            "There was an error adding the Element Pedagogique!",
            error
          );
        });
    }
  };

  const handleDelete = (id) => {
    deleteElementPedagogique(id)
      .then((response) => {
        console.log("Element Pedagogique deleted successfully", response.data);
        const updatedElements = elements.filter(
          (element) => element.idElemPedagogique !== id
        );
        setElements(updatedElements);
      })
      .catch((error) => {
        console.error(
          "There was an error deleting the Element Pedagogique!",
          error
        );
      });
  };

  const handleEdit = (element) => {
    setTitre(element.titre);
    setNiveau(element.niveau);
    setType(element.type);
    setEnseignantId(element.enseignant.idPersonnel);
    setIsEditing(true);
    setCurrentElementId(element.idElemPedagogique);
  };

  const resetForm = () => {
    setTitre("");
    setNiveau("");
    setType("");
    setEnseignantId("");
    setIsEditing(false);
    setCurrentElementId(null);
  };

  return (
    <div>
      <h2>{isEditing ? "Edit" : "Add"} Element Pédagogique</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Niveau:</label>
          <input
            type="text"
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Enseignant:</label>
          <select
            value={enseignantId}
            onChange={(e) => setEnseignantId(e.target.value)}
            required
          >
            <option value="">Select Enseignant</option>
            {enseignants.map((enseignant) => (
              <option
                key={enseignant.idPersonnel}
                value={enseignant.idPersonnel}
              >
                {enseignant.nom} {enseignant.prenom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">
          {isEditing ? "Update" : "Add"} Element Pedagogique
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Elements Pédagogiques</h2>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Niveau</th>
            <th>Type</th>
            <th>Enseignant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((element) => (
            <tr key={element.idElemPedagogique}>
              <td>{element.titre}</td>
              <td>{element.niveau}</td>
              <td>{element.type}</td>
              <td>
                {element.enseignant.nom} {element.enseignant.prenom}
              </td>
              <td>
                <button onClick={() => handleEdit(element)}>Edit</button>
                <button onClick={() => handleDelete(element.idElemPedagogique)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElementPedagogiquePage;
