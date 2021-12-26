import React,{useState, useEffect} from 'react'
import {Table} from 'antd'

const Roomtypes = () => {

    
    const [loading, setLoading] = useState(true);

    const [ data, setData] = useState({
        roomTypes: [],
        pagination: {
            current: 1,
            pageSize: 5,
            total: 0
        }
    });
    const {players, pagination} = data;

    //Definição das colunas da tabela
    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
        },
        {
            title: 'description',
            dataIndex: 'description',
            width: '20%',
        }
    ]

    const fetchApi = (pageSize, current) =>{
        const url = 'http://localhost:80/roomTypes/?' + new URLSearchParams({
            limit: pageSize,
            skip: current -1
        })

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {auth, roomTypes = [],pagination} = response;

            if(auth){
                setLoading(false);
                setData({
                    roomTypes,
                    pagination:{
                        current: pagination.page + 1 || 1,
                        pageSize: pagination.pageSize || 10,
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
                dataSource={players}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                />
        </div>
    );
}

export default Roomtypes;
