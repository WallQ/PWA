import React,{useState, useEffect} from 'react'
import {Table, Space} from 'antd'
import { Button,message,Popconfirm,Rate  } from 'antd';
import { QuestionCircleOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HotelsFormDrawer from './HotelsFormDrawer';

const Hotels = (props) => {

    const [loading, setLoading] = useState(true);
    const [selectedHotel, setSelectedHotel] = useState({});

    const [ data, setData] = useState({
        hotels: [],
        pagination: {
            current: 1,
            pageSize: 7,
            total: 0
        }
    });
    const {hotels, pagination} = data;
    
    //Definição das colunas da tabela
    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
        },
        {
            title: 'Locality',
            dataIndex: 'address',
            width: '30%',
            render: (text, record) => (
                <>{text.locality}</>  
              ),
            
        },
        {
            title: 'Stars',
            dataIndex: 'rating',
            width: '20%',
            render: (text, record) => (
                <Rate allowHalf disabled defaultValue={text} />
            )
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                <Button type="primary" shape="round" onClick={showForm(record._id)}>
                   Edit
                </Button>
                <Popconfirm title="Are you sure？" onConfirm={deleteHotel(record._id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button danger type="dashed" shape="round" >Remove </Button>
                </Popconfirm>
                
            </Space>
          ),
        }
    ]

    //Get Pack
    const getHotels = (pageSize, current) =>{
        //const url = '/roomTypes/?' + new URLSearchParams({
            
        console.log("URL Hotel ID",props.hotelID);
        const url = `/hotel?` + new URLSearchParams({
            limit: pageSize,
            skip: current -1
        })

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            const {auth} = response;
            const {hotels = [],pagination} = response.data;

            if(auth){
                console.log("Resposta API: ",response)
                console.log("Resposta Hotels: ",hotels)
                setLoading(false);
                setData({
                    hotels,
                    pagination:{
                        current: pagination.page + 1 || 1,
                        pageSize: pagination.pageSize || 50,
                        total: pagination.total || 5
                    }
                })
            }

        });
    }
    //Delete RoomType
    const deleteHotel = (id) =>{
        return () =>{
            //console.log("vou inserir")
            const url = '/hotel/' + id

            fetch(url,{
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((response) => {
                console.log("Update Auth: ", response.auth);
                if(response.auth){
                    message.success('Hotel Deleted');
                    //getRooms(data.pagination.pageSize, data.pagination.current);
                }else{
                    message.error('Cant delete Hotel');
                }
                
            })
        }
    }

    //Drawer
    const [hotelFormToogle, setHotelFormToogle] = useState(false);

    const showForm = (id) => {
        return ()=>{
            //console.log("PACK FOUND: ", packs.find((pack)=> pack._id == id))
            setSelectedHotel(hotels.find((hotel)=> hotel._id == id));
            setHotelFormToogle(true);
        }
    };
    const showFormToCreate = () => {
        return ()=>{
            setSelectedHotel('');
            setHotelFormToogle(true);
        }
    };
    const onCloseForm = () => {
       
        
    };
    //end

    //Refresh Table
    const refreshTable = () => {
        getHotels(data.pagination.pageSize, data.pagination.current);
        console.log("RefreshTable")
    };

    const handleTableChange =(pagination)=>{
        getHotels(pagination.pageSize, pagination.current)
    }

    useEffect(()=>{
        if(props.hotelID){
           getHotels(data.pagination.pageSize, data.pagination.current); 
        }
        
        return ()=> setData({
            hotels:[],
            pagination: {
                current: 1,
                pageSize: 0
            }
        })
    },[props.hotelID]);
    

    return (
        <div>
            <Space style={{ marginBottom: "30px"}}>
                <Button 
                    data-testid="btnNewHotel"
                    onClick={showFormToCreate()}
                    type="primary" 
                    style={{ background: "green", borderColor: "green" }}>
                    NEW
                </Button>
            </Space>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={hotels}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />

            <HotelsFormDrawer
                data-testid="drawerHotel"
                hotelID={props.hotelID}
                visible={hotelFormToogle}
                selectedHotel={selectedHotel}
                setVisible={setHotelFormToogle}
                onCloseForm={onCloseForm}
                onAction={refreshTable}
            />
        </div>
    );
}

export default Hotels;
