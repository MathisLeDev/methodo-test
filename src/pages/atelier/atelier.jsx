import React, { useState, useEffect } from "react";
import axios from "axios";

function Atelier(props) {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer toutes les voitures de la base de données (simulé)
        const fetchCars = async () => {
            try {
                const response = await axios.get("votre_endpoint_pour_les_voitures");
                setCars(response.data); // Met à jour l'état avec les données récupérées
            } catch (error) {
                console.error("Erreur lors de la récupération des voitures :", error);
            }
        };

        // Appel de la fonction pour récupérer les voitures au chargement du composant
        fetchCars();
    }, []); // Le tableau vide en tant que dépendance signifie que cette fonction s'exécutera une seule fois lors du montage du composant

    const handleAssign = async (carId) => {
        try {
            // Ici vous pouvez implémenter la logique d'attribution, par exemple envoyer une requête au serveur pour attribuer la voiture
            // await axios.post("votre_endpoint_d_attribution", { carId });

            // Pour l'exemple, supprimons simplement la voiture de la liste localement
            setCars(cars.filter(car => car.id !== carId));
        } catch (error) {
            console.error("Erreur lors de l'attribution de la voiture :", error);
        }
    };

    return (
        <div className="car-grid">
            {/* Mapping à travers la liste des voitures pour afficher chaque voiture sous forme de carte */}
            {cars.map((car, index) => (
                <div key={index} className="car-card">
                    <h3>Nom du véhicule: {car.name}</h3>
                    <p>Marque: {car.brand}</p>
                    <p>Propriétaire: {car.owner}</p>
                    <p>Problème: {car.issue}</p>
                    <p>Temps nécessaire à la réparation: {car.repairTime}</p>
                    <button onClick={() => handleAssign(car.id)}>Assigner</button>
                </div>
            ))}
        </div>
    );
}

export default Atelier;
