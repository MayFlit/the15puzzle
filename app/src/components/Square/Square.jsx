import React from 'react';
import './square.css'
import {useDispatch, useSelector} from "react-redux";
import {choiseGameAC, moveGameAC} from "../../redux/actionCreators/gameAC";


function Square( {id} ) {
    const dispatch = useDispatch()
    let {game}=useSelector(state => state.game)


    function move() {
        dispatch(choiseGameAC(id))
        dispatch(moveGameAC())
    }

    return (
        <div className='square'>
            <div onClick={() => move()}>{id}</div>
        </div>
    );
}

export default Square;