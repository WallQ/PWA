import React,{useState, useEffect} from 'react'
import {Table, Space} from 'antd'
import { Button,message,Popconfirm } from 'antd';
import { QuestionCircleOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PacksFormDrawer from './PacksFormDrawer';

const Packs = (props) => {

    const [loading, setLoading] = useState(true);
    const [selectedPack, setSelectedPack] = useState({});

    const [ data, setData] = useState({
        packs: [],
        pagination: {
            current: 1,
            pageSize: 7,
            total: 0
        }
    });
    const {packs, pagination} = data;
    
    //Definição das colunas da tabela
    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
            width: '40%',
        },
        {
            title: 'Price',
            dataIndex: 'dailyPrice',
            width: '40%'
            
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                <Button type="primary" shape="round" onClick={showForm(record._id)}>
                   Edit
                </Button>
                <Popconfirm title="Are you sure？" onConfirm={deletePack(record._id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button danger type="dashed" shape="round" >Remove </Button>
                </Popconfirm>
                
            </Space>
          ),
        }
    ]

    //Get Pack
    const getPacks = (pageSize, current) =>{
        //const url = '/roomTypes/?' + new URLSearchParams({
            
        console.log("URL Hotel ID",props.hotelID);
        const url = `/hotel/${props.hotelID}/packs?` + new URLSearchParams({
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
            const {packs = [],pagination} = response.data;

            if(auth){
                console.log("Resposta: ",response)
                setLoading(false);
                setData({
                    packs,
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
    const deletePack = (id) =>{
        return () =>{
            //console.log("vou inserir")
            const url = '/packs/' + id

            fetch(url,{
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((response) => {
                console.log("Update Auth: ", response.auth);
                if(response.auth){
                    message.success('Pack Deleted');
                    //getRooms(data.pagination.pageSize, data.pagination.current);
                }else{
                    message.error('Cant delete Pack');
                }
                
            })
        }
    }

    //Drawer
    const [packFormToogle, setPackFormToogle] = useState(false);

    const showForm = (id) => {
        return ()=>{
            //console.log("PACK FOUND: ", packs.find((pack)=> pack._id == id))
            setSelectedPack(packs.find((pack)=> pack._id == id));
            setPackFormToogle(true);
        }
    };
    const showFormToCreate = () => {
        return ()=>{
            setSelectedPack('');
            setPackFormToogle(true);
        }
    };
    const onCloseForm = () => {
       
        
    };
    //end

    //Refresh Table
    const refreshTable = () => {
        getPacks(data.pagination.pageSize, data.pagination.current);
        console.log("RefreshTable")
    };

    const handleTableChange =(pagination)=>{
        getPacks(pagination.pageSize, pagination.current)
    }

    useEffect(()=>{
        if(props.hotelID){
           getPacks(data.pagination.pageSize, data.pagination.current); 
        }
        
        return ()=> setData({
            packs:[],
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
                dataSource={packs}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                />

            <PacksFormDrawer
                hotelID={props.hotelID}
                visible={packFormToogle}
                selectedPack={selectedPack}
                setVisible={setPackFormToogle}
                onCloseForm={onCloseForm}
                onAction={refreshTable}
            />
        </div>
    );
}

export default Packs;
