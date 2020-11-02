import React, { useEffect }  from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { removeReserve , increaseReserveAmount , decreaseReserveAmount } from '../store/modules/reserve/actions';

export default () => {
    const reserves = useSelector(state => state.reserve);
    const dispatch = useDispatch();

    function handleRemove(id){
        dispatch(removeReserve(id));
    }

    useEffect(()=>{

    },[]);

    function handleIncreaseAmount(id){
        dispatch(increaseReserveAmount(id));
    }

    function handleDecreaseAmount(id){
        dispatch(decreaseReserveAmount(id));
    }

    return(
        <div>
            <h1>
                Você solicitou {reserves.length} reservas
            </h1>
            {reserves.map((reserve,index)=>{
                reserve = reserve || {};
                if(reserve.amount){
                    return(
                        <div key={reserve.id}>
                            <img
                                src={reserve.image}
                            /><br/>
                            <button onClick={() => handleIncreaseAmount(reserve.id)}>+</button>
                            <strong>{reserve.title} - {reserve.amount}</strong><br/>
                            <button onClick={() => handleDecreaseAmount(reserve.id)}>-</button>
                            <button 
                                onClick={() => handleRemove(reserve.id)}
                            >
                                Remover
                            </button>
                            <br/><br/>
                        </div>   
                    );
                }else{
                    handleRemove(reserve.id)
                }
            })}

        </div>
    );
}