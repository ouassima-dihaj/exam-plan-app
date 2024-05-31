import React, { useEffect, useState } from 'react';
import  {getSalleName} from '../services/AdminService';
import UpdateAdminComponent from './UpdateAdminComponent';
import { deleteAdmin, getAllAdmins } from '../services/AdminService';

function ListAdminComponent() {
    const [admins, setAdmins] = useState([]);
    const [namesMap, setNamesMap] = useState({});
    const [updateId, setUpdateId] = useState(null);

    const fetchadminWithNames = async () => {
        try {
            const adminResponse = await getAllAdmins();
            const adminData = adminResponse.data;


            const sallePromises = adminData.map(admin => 
                getSalleName(admin.idSalle).then(response => ({
                    id: admin.idSalle,
                    name: response.data.nom,
                    type: 'salle'
                }))
            );

            const allPromises = [
                ...sallePromises
            ];

            const results = await Promise.all(allPromises);

            const newNamesMap = results.reduce((acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = {};
                }
                acc[item.type][item.id] = item.name;
                return acc;
            }, {});

            setNamesMap(newNamesMap);
            setAdmins(adminData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchadminWithNames();
    }, []);

    const handleDelete = async (idPersonnel) => {
        try {
            await deleteAdmin(idPersonnel);
            setAdmins(admins.filter(admin => admin.idPersonnel !== idPersonnel)); //setting the admin with new admin array without the deleted enseignant
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleUpdateSuccess = () => {
        setUpdateId(null);
        fetchadminWithNames();
    };

    return (
        <div>
            <h2>Enseignant List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Salle</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.idPersonnel}>
                            <td>{admin.idPersonnel}</td>
                            <td>{admin.nom}</td>
                            <td>{admin.prenom}</td>
                            <td>{namesMap.salle && namesMap.salle[admin.idSalle]}</td>
                            <td>
                                <button onClick={() => handleDelete(admin.idPersonnel)}>Delete</button>
                            </td>
                            <td>
                                <button onClick={() => setUpdateId(admin.idPersonnel)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {updateId && (
                <UpdateAdminComponent 
                    adminId={updateId} 
                    onUpdateSuccess={handleUpdateSuccess} 
                    onCancel={() => setUpdateId(null)} //if canceled set the update id to null so the update component will not be displayed
                />
            )}
        </div>
    );
}

export default ListAdminComponent;
