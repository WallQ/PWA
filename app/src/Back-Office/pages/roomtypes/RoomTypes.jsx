import React,{useState, useEffect} from 'react'
import {Table, Space} from 'antd'
import { Button,message,Popconfirm } from 'antd';
import { DeleteOutlined,QuestionCircleOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Roomtypes = (props) => {

    const [selectedRoomType, setSelectedRoomType] = useState({});

    const [loading, setLoading] = useState(true);
    const [ data, setData] = useState({
        roomTypes: [],
        pagination: {
            current: 1,
            pageSize: 2,
            total: 0
        }
    });
    
    //Definição das colunas da tabela
    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '40%',
        },
        {
            title: 'Guests',
            dataIndex: 'maxGuest',
            width: '10%',
        },
        {
            title: 'Guests Child',
            dataIndex: 'maxGuestChild',
            width: '10%',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                <Button type="primary" shape="round">
                    <Link to={"/admin/roomTypes/" + record._id}>Edit </Link>
                </Button>
                <Popconfirm title="Are you sure？" onConfirm={deleteRoomType(record._id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button danger type="dashed" shape="round" >Remove </Button>
                </Popconfirm>
                
            </Space>
          ),
        }
    ]

    const {roomTypes, pagination} = data;

    const fetchApi = (pageSize, current) =>{
        //const url = '/roomTypes/?' + new URLSearchParams({
            
        console.log("URL Hotel ID",props.hotelID);
        const url = `/hotel/${props.hotelID}/roomTypes?` + new URLSearchParams({
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
            const {roomTypes = [],pagination} = response.data;
            if(auth){
                //console.log("Resposta: ",response)
                setLoading(false);
                setData({
                    roomTypes,
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
    const deleteRoomType = (id) =>{
        return () =>{
            //console.log("vou inserir")
            const url = '/roomTypes/' + id

            fetch(url,{
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((response) => {
                //console.log("Update Auth: ", response.auth);
                if(response.auth){
                    message.success('RooomType Deleted');
                    fetchApi(data.pagination.pageSize, data.pagination.current);
                }else{
                    message.error('Cant delete RooomType');
                }
                
            })
        }
    }

    useEffect(()=>{
        if(props.hotelID){
           fetchApi(data.pagination.pageSize, data.pagination.current); 
        }
        

        return ()=> setData({
            roomTypes:[],
            pagination: {
                current: 1,
                pageSize: 10
            }
        })

    },[props.hotelID]);
    
    const handleTableChange =(pagination)=>{
        fetchApi(pagination.pageSize, pagination.current)
    }

    return (
        <div>
            <Space style={{ marginBottom: "30px"}}>
                <Button 
                    href='roomTypes/new'
                    type="primary" 
                    style={{ background: "green", borderColor: "green" }}>
                    NEW
                </Button>
            </Space>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={roomTypes}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                />
        </div>
    );
}

export default Roomtypes;
