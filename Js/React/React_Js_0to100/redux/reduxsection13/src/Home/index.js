import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addReserveRequest } from '../store/modules/reserve/actions';

export default () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [trips, setTrips] = useState([]);

    useEffect(() => {

        async function loadTrips() {
            const data = await fetch("http://localhost:3333/trips");
            const json = await data.json();

            setTrips(json);
        }
        loadTrips();
    }, []);

    function handleAdd(trip) {
        dispatch(addReserveRequest(trip));
    }


    return (
        <h1>
            <ul>
                {trips.map((trip) => {
                    return (
                        <li key={trip.id}>
                            <img src={trip.image} />
                            <strong>{trip.title}</strong>
                            <span>Status: {trip.status ? 'Disponível' : 'Indisponível'}</span>
                            <button
                                onClick={() => handleAdd(trip)}
                            >
                                Solicitar reserva
                        </button>
                        </li>
                    );
                })}
            </ul>
        </h1>
    );
}