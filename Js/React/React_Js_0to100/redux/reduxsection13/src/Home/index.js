import React , { useState , useEffect }  from 'react';

export default () => {
    
    const [trips,setTrips] = useState([]);

    useEffect(()=>{

        async function loadTrips(){
            const data = await fetch("http://localhost:3333/trips");
            const json = await data.json();

            setTrips(json);
        }
        loadTrips();
    },[]);


    return(
        <h1>
            <ul>
                {trips.map((trip) => {
                   return(
                   <li>
                        <img src={trip.image} />
                        <strong>{trip.title}</strong>
                        <span>Status: {trips.status ? 'Disponível' : 'Indisponível'}</span>
                        <button>
                            Solicitar reserva
                        </button>
                    </li>
                   );
                })}
            </ul>
        </h1>
    );
}