import React,{useState, useEffect} from 'react'
import {Table, Tag, Space} from 'antd'
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Roomtypes = () => {

    const [selectedRoomType, setSelectedRoomType] = useState({});

    //Modal Edit
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');

    const showModal = (id) => {
        return () =>{
            setSelectedRoomType(id);
            setVisible(true); 
        }
        
      };
    
    const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
    }, 2000);
    };
    
    const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    };
    //End Modal Edit

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
            width: '20%',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                <Button type="primary" shape="round">
                    <Link to={"/admin/roomTypes/" + record._id}>Edit {record._id}</Link>
                </Button>
                <Button danger type="dashed" shape="round" >Remove </Button>
            </Space>
          ),
        }
    ]

    const {roomTypes, pagination} = data;


    const fetchApi = (pageSize, current) =>{
        const url = '/roomTypes/?' + new URLSearchParams({
            limit: pageSize,
            skip: current -1
        })

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            const {auth, roomTypes = [],pagination} = response;

            if(auth){

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

    useEffect(()=>{
        fetchApi(data.pagination.pageSize, data.pagination.current);

        return ()=> setData({
            roomTypes:[],
            pagination: {
                current: 1,
                pageSize: 10
            }
        })
    },[]);
    
    const handleTableChange =(pagination)=>{
        fetchApi(pagination.pageSize, pagination.current)
    }

    return (
        <div>
            <h1>Room Types</h1>
            <Table
                columns={columns}
                rowKey={record => record._id}
                dataSource={roomTypes}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                />

            <Modal
                title = {selectedRoomType?._id}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
                
            </Modal>
        </div>
    );
}

export default Roomtypes;
