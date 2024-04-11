import React, { useState, useEffect } from "react";
import {getData, postDataWithoutToken} from "../../api/api";
import {VEHICLESTATUS, VehicleStatus} from "../../enums/vehicleStatus";
import {VehicleStatusClass} from "../../enums/vehicleStatusClass";

function Atelier(props) {
    const [vehicles, setVehicles] = useState([]);
    const [mecanics, setMecanics] = useState([]);

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedMecanic, setSelectedMecanic] = useState(null);

    const [places, setPlaces] = useState([]);
    const [placesLoading, setPlacesLoading] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);




    useEffect(() => {
        // Fonction pour récupérer toutes les voitures de la base de données (simulé)
        const fetchCars = async () => {
            const data =  await getData("http://localhost:3001/api/atelier/workshop/vehicles")
            if(typeof data === "object") {
                console.log(data.data);
                setVehicles(data.data);
            }
        };

        const fetchMecanics = async () => {
            const data =  await getData("http://localhost:3001/api/atelier/workshop/mecanics")
            if(typeof data === "object") {
                console.log(data.data);
                setMecanics(data.data);
            }
        };
        // Appel de la fonction pour récupérer les voitures au chargement du composant
        fetchCars();
        fetchMecanics();
    }, []); // Le tableau vide en tant que dépendance signifie que cette fonction s'exécutera une seule fois lors du montage du composant


    const handleVehicleAssignement = (id) => {
        //open modal
        document.getElementById("my_modal_7").checked = true;
        setSelectedVehicle(id);

    }


    const handleAssignVehicle = async () => {
        const url = "http://localhost:3001/api/workshop/vehicles/assignment";
        const body =  {
            "vehicle_id": selectedVehicle,
            "mechanic_id": "uuid",
            "place_id": selectedPlace,
        }
        console.log(body)
        postDataWithoutToken(url, body).then((response) => {
            alert('Assignement effectué');
        }).catch((error) => {
            alert(error?.response?.data?.message || 'Erreur lors de l\'assignement');
        })
    }

    const fetchPlaces = async () => {
        setPlacesLoading(true)
        getData("http://localhost:3001/api/atelier/workshop/places?date=11-04-2024&hour=10").then((res) => {
            setPlaces(res.data);
            setPlacesLoading(false);
        }).catch((err) => {
            console.log(err);
            setPlacesLoading(false);
        });
    }

    const handleCancelAppointment = () => {
        setSelectedMecanic(null);
        setSelectedVehicle(null);
        document.getElementById("my_modal_7").checked = false;


    }


    useEffect(() => {
        console.log(selectedMecanic)
        console.log(isNotReady)

    }, [selectedMecanic]);

    useEffect(() => {
        if(selectedVehicle && selectedMecanic)
            fetchPlaces().then((res) => {
                console.log("place",res);
            }).catch((err) => {
                console.log("error place", err);
            });

    }, [selectedVehicle, selectedMecanic]);

    const handleConfirmationClick = () => {
        if(isNotReady) {
            handleAssignVehicle().then((res) => {
            }).catch((err) => {
            });
        }
    }



    const isNotReady = !!selectedMecanic && !!selectedVehicle && !!selectedPlace;


    return (
        <div className="car-grid">

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />


            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col">
                    <div className="overflow-x-auto flex flex-col ">
                        <h1 className={"text-xl"}>Selectionnez un mécanicien</h1>
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>
                                    <label>
                                    </label>
                                </th>
                                <th>Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            {mecanics.length > 0 && mecanics.map((mecanic, index) => (
                                <tr>
                                    <th>
                                        <label>
                                            <input type="radio" name={"test"} className="radio radio-success" onClick={()=>setSelectedMecanic(mecanic?.id)}/>
                                        </label>
                                    </th>
                                    <td key={index}>{mecanic?.name || "Inconnu"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={"my-5 flex flex-col gap-4"}>
                    <h1 className={"text-xl"}>Selectionnez un emplacement</h1>

                    <div className={"grid grid-rows-3 grid-flow-col gap-4 justify-around"}>
                        {placesLoading ? <h1>Chargement des places <span className={"loading loading-sm"}></span></h1> : places.map((place, index) => (
                            <input type={"button"} value={place?.name || "??"} key={index} disabled={!place?.available}  className={`${place?.available ? '':'btn-error'} ${selectedPlace === place?.id && "btn-success"} flex btn flex-row justify-between`} onClick={()=>setSelectedPlace(place?.id)} />
                        ))}
                    </div>
                    </div>

                    <div className={"flex flex-row justify-end gap-4"} >
                        <input type={"button "} value={"ANNULER"} className={"btn btn-error"} onClick={handleCancelAppointment}/>
                        <input type={"button"} value={"CONFIRMER"} onClick={handleConfirmationClick} className={`${selectedMecanic && selectedVehicle && selectedPlace ? " btn-success ":" btn-ghost "} btn btn-success  text-white`} disabled={!isNotReady}  />
                    </div>
                </div>

                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>


            <div className={"flex flex-row gap-4"}>

            {vehicles.length > 0 ? vehicles.map((vehicle, index) => (
                    <div className="card w-96 bg-base-100 shadow-xl m-4" key={index}>
                        <figure><img src={vehicle.img} alt="" className={'w-full object-contain'} /></figure>
                        <div className="card-body">
                            <div className={"flex flex-row justify-between"}>
                                <h2 className="card-title">{vehicle.model} de {vehicle.brand}</h2>
                                <h2 className={`${VehicleStatusClass[vehicle?.status || 0]} text-white card-title text-sm rounded-full p-1 px-2`}>{VehicleStatus[vehicle?.status || 0]}</h2>

                            </div>
                            <p>Envoyé pour {vehicle.repair_type}</p>
                            <p>Temps estimé de {vehicle.repair_duration}</p>
                            <div className={"flex flex-row justify-between items-center"}>
                                Propriétaire: {vehicle.owner.name}
                                { vehicle?.status === VEHICLESTATUS.AREPARER &&
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={()=>handleVehicleAssignement(vehicle.id)}>Assigner</button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
            )): <h1 className={'text-3xl text-white'}>Pas de voitures</h1>}
            </div>

        </div>
    );
}

export default Atelier;
