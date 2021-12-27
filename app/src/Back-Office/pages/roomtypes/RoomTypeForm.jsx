import React,{useState, useEffect} from 'react'
import { Navigate, useParams } from "react-router-dom";

const RoomTypeForm = () => {
    let params = useParams();

    const [roomType, setRoomType] = useState({});

    const getRoomType = () =>{
        const url = '/roomTypes/' + params.id

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            const {status, data = [],message} = response;

            if(data){
                setRoomType(data)
            }

        })
    }

    useEffect(() => {
        getRoomType()
    }, []);

    if(!roomType || !params){
       return <Navigate to={'/admin'}/>
    }

    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    );
}

export default RoomTypeForm;
