import React,{useState, useEffect} from 'react'
import { Drawer,DatePicker,message,Form,InputNumber, Button, Col, Row, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import {getClients,getRoomTypes,getPacks} from "../../services/API"

const { Option } = Select;
const { RangePicker } = DatePicker;

const BooksFormDrawer = (props) => {

    const [clients, setClients] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [packs, setPacks] = useState([]);

    
    

    //FORMULARIO
    const [form] = Form.useForm();

    const onFormFinish = (values) => {
        if(book){
            //updatePack(pack._id,values);
        
        }else{
            newBook(props.hotelID,values);
        }
        console.log("Submit Form: ",values)
      
    };
    const onFormFinishFailed = (data) => {
        //console.log(data);
    };

    //Dados do room
    const [book, setBook] = useState('');

    //GET os dados do ROOMTYPE
    const getPack = (id) =>{

        const url = '/packs/' + id

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {status, data} = response;
            
            if(data){
                //console.log("GET PACKS: ", data)
                setBook(data)
                form.setFieldsValue({
                    ...data,
                    date: [moment(data.checkIn_date),moment(data.checkOut_date)],
                    //freeCancel: {value: data.freeCancel},
                });
                //form.setFieldsValue({packs: {value: data.roomType}})
            }  else{
                message.error('Cant find Room to Edit');
            }
        })
    }
    //NEW Room
    const newBook = (hotelID,values) =>{
        //console.log("INSERT: ",hotelID,"Values: ", values)
        const url = '/books'
        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                hotel: hotelID,
                client: values.client.value,
                roomType : values.roomType.value,
                room: values.room.value,
                hotel: values.hotel.value,
                pack: values.pack.value,
                total_price: values.client,
                checkIn_date: values.date[0]._d,
                checkOut_date: values.date[1]._d   
            })
        })
        .then((response) => response.json())
        .then((response) => {
            //console.log("Response: ", response)
            if(response.auth){
                message.success('Book Created');
                props.setVisible(false);
            }else{
                message.error('Cant create Book');
            }
        })
    }
    //Update Room
    const updatePack = (packID, values) =>{
        //console.log("vou inserir")
        const url = '/packs/' + packID

        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                name:values.name,
                dailyPrice:values.dailyPrice,
                freeCancel: values.freeCancel.value,
                start_date: values.date[0]._d,
                end_date: values.date[1]._d,
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.auth){
                message.success('Rooom Updated');
                props.setVisible(false)
            }else{
                message.error('Cant update Rooom');
            }
            
        })
    }

    

    useEffect(() => {
        if(props.selectedBook?._id)
        {
           getPack(props.selectedBook._id) 
        }

        //Carregar Clientes para formulario
        if(!clients == []){
            getClients()
            .then((values)=>{setClients(values)})
            .catch((err)=>{message.error('Cant find Clients')})
        }
        //Carregar RoomTypes para formulario
        if(!roomTypes == [] && props.hotelID){
            getRoomTypes(props.hotelID)
            .then((values)=>{setRoomTypes(values)})
            .catch((err)=>{message.error('Cant find Room Types')})
        }
        //Carregar PAcks para formulario
        if(!packs == [] && props.hotelID){
            getPacks(props.hotelID)
            .then((values)=>{setPacks(values)})
            .catch((err)=>{message.error('Cant find Room Packs')})
        }
        
        
        
        
        return () => {
            form.resetFields();
            if(!props.visible){
                
              props.onCloseForm()  
            }
            
        };
        
    }, [props.selectedBook,props.hotelID]);

    return (
        <>   
            <Drawer
                title={(props.selectedBook) ? "Edit Book: " : "New Book"}
                width={720}
                onClose={()=>props.setVisible(false)}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={()=>props.setVisible(false)}>Cancel</Button>
                        <Button 
                            form="formRoom"
                            type="primary" 
                            htmlType="submit"
                            >
                            {(props.selectedBook) ? "Update" : "Create"}
                        </Button>
                    </Space>
                }
            >
            <Form
                id="formRoom"
                form={form}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
                layout="vertical" 
                hideRequiredMark
                >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="client"
                            label="Client"
                            rules={[{ required: true, message: 'Please enter a number room' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {
                                    clients.map((val)=>{
                                        return <Option value= {val._id} key= {"clients" + val._id}>{val.name + " " + val.surname}</Option>
                                    })
                                }
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="roomType"
                            label="Room Type"
                            rules={[{ required: true, message: 'Please enter a number room' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {
                                    roomTypes.map((val)=>{
                                        return <Option value= {val._id} key= {"roomType" + val._id}>{val.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="room"
                            label="Room"
                            rules={[{ required: true, message: 'Please enter a number room' }]}
                        >
                            <Select
                                showSearch
                                mode= {'multiple'}
                                style={{ width: '100%' }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="1">Not Identified</Option>
                                <Option value="2">Closed</Option>
                                <Option value="3">Communicated</Option>
                                <Option value="4">Identified</Option>
                                <Option value="5">Resolved</Option>
                                <Option value="6">Cancelled</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="pack"
                            label="Pack"
                            rules={[{ required: true, message: 'Please enter a number room' }]}
                        >
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {
                                    packs.map((val)=>{
                                        return <Option value= {val._id} key= {"pack" + val._id}>{val.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="total_price"
                            label="Price"
                        >
                            <InputNumber 
                                style={{ width: '100%' }}
                                addonAfter="€" 
                                defaultValue={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label="Check IN / Check Out"
                        >
                            <RangePicker
                                style={{ width: '100%' }}
                                defaultValue={[moment(), moment().add(1,'days')]}
                                format={'DD/MM/YYYY'}/>  
                        </Form.Item>
                         
                    </Col>
                </Row>
                
            </Form>
            </Drawer>
        </>
    );
}

export default BooksFormDrawer;
