import React, { useState, useEffect } from "react";
import {getData, postDataWithoutToken} from "../../api/api";

function Atelier(props) {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer toutes les voitures de la base de données (simulé)
        const fetchCars = async () => {
            const data =  await getData("http://localhost:3001/api/atelier/workshop/vehicles")
            if(typeof data === "object") {
                console.log(data.data);
                setVehicles(data.data);
            }
        };
        // Appel de la fonction pour récupérer les voitures au chargement du composant
        fetchCars();
    }, []); // Le tableau vide en tant que dépendance signifie que cette fonction s'exécutera une seule fois lors du montage du composant


    const handleVehicleAssignement = (id) => {
        const url = "http://localhost:3001/api/workshop/vehicles/assignment";
        const body =  {
            "vehicle_id": "uuid",
            "mechanic_id": "uuid",
            "date": "2021-09-01T00:00:00.000Z"
        }
        postDataWithoutToken(url, body).then((response) => {
            alert(response.data.message)
            console.log(response);
        }).catch((error) => {
            alert(error?.response?.data?.message || "Une erreur est survenue")
            console.log(error);
        })
    }

    return (
        <div className="car-grid">
            {vehicles.length > 0 ? vehicles.map((vehicle, index) => (
                    <div className="card w-96 bg-base-100 shadow-xl m-4" key={index}>
                        <figure><img src={ vehicle.img} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{vehicle.model} de {vehicle.brand}</h2>
                            <p>Envoyé pour {vehicle.repair_type}</p>
                            <p>Temps estimé de {vehicle.repair_duration}</p>
                            <div className={"flex flex-row justify-between items-center"}>
                                Propriétaire: {vehicle.owner.name}
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={()=>handleVehicleAssignement(vehicle.id)}>Assigner</button>
                                </div>
                            </div>
                        </div>
                    </div>


            )): <h1>Pas de voitures</h1>}
        </div>
    );
}

export default Atelier;
