import React,{ useState, useEffect } from 'react';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Selecthotelworking = (props) => {
    const navigate = useNavigate();
    
    const [options, setOptions] = useState([]);
    const [selectedOnLocalSorage, setSelectedOnLocalSorage] = useState(localStorage.getItem("hotelID"));

    function onChangeHotel(value) {
        setSelectedOnLocalSorage(value);
        props.setHotelID(value);
        localStorage.setItem("hotelID", value);
        //navigate('/admin');
        //console.log(`selected ${value}`);
    }

    const getWorkingOn = () =>{
        fetch('/hotel/workingon', {
            headers: { Accept: 'application/json' },
        })
        .then((response) => response.json())
        .then((response) => {

            //console.log(response.data.some((val) => selectedOnLocalSorage == val._id))
            if(response.data.hotels.some((val) => selectedOnLocalSorage == val._id)){
                props.setHotelID(selectedOnLocalSorage);
            }else{
                //console.log("Primeiro ID da lista",response.data[0]._id)
                setSelectedOnLocalSorage(response.data.hotels[0]._id);
                props.setHotelID(response.data.hoteld[0]._id);
            }

            setOptions(response.data.hotels)
            //console.log("WORKING ON: ", response.data)

            })
        .catch(() => {
            //console.log("Error");
            });
      }

    useEffect(() => {
        getWorkingOn();

        //const selectedOnLocalSorage = localStorage.getItem("hotelID")
        //props.setHotelID(localStorage.getItem("hotelID"));
    }, []);


      
    return (
        <Select
            showSearch
            placeholder="Select an Hotel"
            optionFilterProp="children"
            value = {selectedOnLocalSorage}
            onChange={onChangeHotel}
            //onSearch={onSearch}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                options.map((value)=>{       
                    return <Option key={value._id}>{value.name}</Option>
                })
            }
        </Select>
    );
}

export default Selecthotelworking;
