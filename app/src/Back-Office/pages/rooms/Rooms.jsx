import React,{useState, useEffect} from 'react'
import {Table, Space} from 'antd'
import { Button,message,Popconfirm } from 'antd';
import { QuestionCircleOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RoomsFormDrawer from './RoomsFormDrawer';

const Rooms = (props) => {

    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState('');

    const [ data, setData] = useState({
        rooms: [],
        pagination: {
            current: 1,
            pageSize: 2,
            total: 0
        }
    });
    const {rooms, pagination} = data;
    
    //Definição das colunas da tabela
    const columns =[
        {
            title: 'Number',
            dataIndex: 'number',
            width: '40%',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                <Button type="primary" shape="round" onClick={showForm(record._id)}>
                   Edit
                </Button>
                <Popconfirm title="Are you sure？" onConfirm={deleteRoom(record._id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button danger type="dashed" shape="round" >Remove </Button>
                </Popconfirm>
                
            </Space>
          ),
        }
    ]

    //Get RoomType
    const getRooms = (pageSize, current) =>{
        //const url = '/roomTypes/?' + new URLSearchParams({
            
        console.log("URL Hotel ID",props.hotelID);
        const url = `/hotel/${props.hotelID}/rooms?` + new URLSearchParams({
            limit: pageSize,
            skip: current -1
        })

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            //console.log(response)

            const {auth} = response;
            const {rooms = [],pagination} = response.data;

            if(auth){
                console.log("Resposta: ",response)
                setLoading(false);
                setData({
                    rooms,
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
    const deleteRoom = (id) =>{
        return () =>{
            //console.log("vou inserir")
            const url = '/rooms/' + id

            fetch(url,{
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((response) => {
                console.log("Update Auth: ", response.auth);
                if(response.auth){
                    message.success('Rooom Deleted');
                    getRooms(data.pagination.pageSize, data.pagination.current);
                }else{
                    message.error('Cant delete Rooom');
                }
                
            })
        }
    }

    //Drawer
    const [roomFormToogle, setRoomFormToogle] = useState(false);

    const showForm = (id) => {
        return ()=>{
            setSelectedRoom(rooms.find((room)=> room._id == id));
            setRoomFormToogle(true);
        }
    };
    const showFormToCreate = () => {
        return ()=>{
            setSelectedRoom('');
            setRoomFormToogle(true);
        }
    };

    const onCloseForm = () => {
            console.log("Fechou")
            //getRooms(data.pagination.pageSize, data.pagination.current);
        
    };
    //end

    const handleTableChange =(pagination)=>{
        getRooms(pagination.pageSize, pagination.current)
    }

    useEffect(()=>{
        if(props.hotelID){
           getRooms(data.pagination.pageSize, data.pagination.current); 
        }
        
        return ()=> setData({
            rooms:[],
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
                    onClick={showFormToCreate()}
                    type="primary" 
                    style={{ background: "green", borderColor: "green" }}>
                    NEW
                </Button>
            </Space>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={rooms}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                />
            <RoomsFormDrawer
                hotelID={props.hotelID}
                visible={roomFormToogle}
                selectedRoom={selectedRoom}
                setVisible={setRoomFormToogle}
                onCloseForm={onCloseForm}
            />
        </div>
    );
}

export default Rooms;
