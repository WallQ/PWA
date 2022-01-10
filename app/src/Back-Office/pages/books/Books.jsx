import React,{useState, useEffect} from 'react'
import {Table, Space} from 'antd'
import { Button,message,Popconfirm } from 'antd';
import { QuestionCircleOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import BooksFormDrawer from './BooksFormDrawer';
import moment from 'moment';

const Books = (props) => {

    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState({});

    const [ data, setData] = useState({
        books: [],
        pagination: {
            current: 1,
            pageSize: 7,
            total: 0
        }
    });
    const {books, pagination} = data;
    
    //Definição das colunas da tabela
    const columns =[
        {
            title: 'Room',
            dataIndex: 'roomType',
            width: '20%',
            render: (text, record) => (
                <>{text.name}</>
            )
        },
        {
            title: 'Pack',
            dataIndex: 'pack',
            width: '20%',
            render: (text, record) => (
                <>{text.name}</>
            )
            
        },
        {
            title: 'Check In',
            dataIndex: 'checkIn_date',
            width: '20%',
            render: (text, record) => (
                <>{moment(new Date(text)).format("DD/MM/YYYY")}</>
            )  
        },
        {
            title: 'Check Out',
            dataIndex: 'checkOut_date',
            width: '20%',
            render: (text, record) => (
                <>{moment(new Date(text)).format("DD/MM/YYYY")}</>
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
                <Popconfirm title="Are you sure？" onConfirm={deleteBook(record._id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button danger type="dashed" shape="round" >Remove </Button>
                </Popconfirm>
                
            </Space>
          ),
        }
    ]

    //Get Pack
    const getBooks = (pageSize, current) =>{
        //const url = '/roomTypes/?' + new URLSearchParams({
            
        console.log("URL Hotel ID",props.hotelID);
        const url = `/hotel/${props.hotelID}/books?` + new URLSearchParams({
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
            const {books = [],pagination} = response.data;

            if(auth){
                console.log("Resposta GET Books: ",response)
                setLoading(false);
                setData({
                    books: books,
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
    const deleteBook = (id) =>{
        return () =>{
            //console.log("vou inserir")
            const url = '/books/' + id

            fetch(url,{
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((response) => {
                if(response.auth){
                    message.success('Book Deleted');
                    getBooks(data.pagination.pageSize, data.pagination.current);
                }else{
                    message.error('Cant delete Book');
                }
                
            })
        }
    }

    //Drawer
    const [bookFormToogle, setBookFormToogle] = useState(false);

    const showForm = (id) => {
        return ()=>{
            setSelectedBook(books.find((books)=> books._id == id));
            setBookFormToogle(true);
        }
    };
    const showFormToCreate = () => {
        return ()=>{
            setSelectedBook('');
            setBookFormToogle(true);
        }
    };
    const onCloseForm = () => {
            console.log("Fechou")
        
    };
    //end

    const handleTableChange =(pagination)=>{
        getBooks(pagination.pageSize, pagination.current)
    }

    useEffect(()=>{
        if(props.hotelID){
           getBooks(data.pagination.pageSize, data.pagination.current); 
        }
        
        return ()=> setData({
            books:[],
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
                dataSource={books}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                />

            <BooksFormDrawer
                hotelID={props.hotelID}
                visible={bookFormToogle}
                selectedBook={selectedBook}
                setVisible={setBookFormToogle}
                onCloseForm={onCloseForm}
            />
        </div>
    );
}

export default Books;
