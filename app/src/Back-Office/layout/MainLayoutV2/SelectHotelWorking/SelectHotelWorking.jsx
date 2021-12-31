import React,{ useState, useEffect } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const Selecthotelworking = (props) => {

    
    const [options, setOptions] = useState([]);

    function onChangeHotel(value) {
        props.setHotelID(value);
        localStorage.setItem("hotelID", value);
        console.log(`selected ${value}`);
    }

    useEffect(() => {
        props.setHotelID(localStorage.getItem("hotelID"));
        setOptions([
            {_id: "61a046e582d81d49a844e184",name:"The Yeatman"},
            {_id: "61a0479f82d81d49a844e191",name:"Tivoli Marina Vilamoura Algarve Resort"},
            {_id: "61a0483796cd78a40308a76b",name:"Hotel Altis Avenida"}
        ])
    }, []);

      
    return (
        <Select
            showSearch
            placeholder="Select an Hotel"
            optionFilterProp="children"
            defaultValue = {localStorage.getItem("hotelID")}
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
