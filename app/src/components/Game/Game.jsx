import React, {useEffect} from 'react';
import './game.css'
import Square from "../Square/Square";
import {useDispatch, useSelector} from "react-redux";
import {initGameAC} from "../../redux/actionCreators/gameAC";
import { v4 as uuidv4 } from 'uuid';
import Win from "../Win/Win";


function Game() {
    const dispatch = useDispatch()
    const {game, solved}=useSelector(state => state.game)


    useEffect(()=>{
       dispatch(initGameAC())
    },[])

    return (
        <div className='game'>
            {solved.solve ? <Win/> : game.length && game.map(x => x.map(x => <Square key={uuidv4()} id={x.id}/>))}
        </div>
    );
}

export default Game;