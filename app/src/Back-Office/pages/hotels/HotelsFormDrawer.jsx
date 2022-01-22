import React,{useState, useEffect} from 'react'
import { Drawer,DatePicker,message,Form, Button, Col, Row, Input, Select, Space,Rate } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import {getClients} from "../../services/Api"

const { Option } = Select;
const { TextArea } = Input;

const languagesData = [
    {initials:"PT", country:"Portugal", language:"Portuguese" },
    {initials:"EN", country:"United Kingdom", language:"English" },
    {initials:"ES", country:"Spain", language:"Spanish" },
    {initials:"FR", country:"France", language:"French" },
    {initials:"IT", country:"Italy", language:"Italian" },
    {initials:"DE", country:"Germany", language:"German" },
]

const HotelsFormDrawer = (props) => {


    //FORMULARIO
    const [form] = Form.useForm();

    const onFormFinish = (values) => {
        if(hotel){
            updateHotel(hotel._id,values);
        
        }else{
            newRoomType(props.hotelID,values);
        }
        console.log("Submit Form: ",values)
      
    };
    const onFormFinishFailed = (data) => {
        //console.log(data);
    };

    //Dados do hotel
    const [hotel, setHotel] = useState('');

    const [clients, setClients] = useState([]);

    //GET os dados do hotel
    const getHotel = (id) =>{

        const url = '/hotel/' + id

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {status, data} = response;
            if(data){
                console.log("RESPONSE DATA: ", data)
                setHotel(data)
                form.setFieldsValue({
                    ...data,
                    languages: data.languages.map((e)=> {return e.initials})
                });
            }  else{
                message.error('Cant find Hotel to Edit');
            }
        })
    }
    //NEW hotel
    const newRoomType = (hotelID,values) =>{
        console.log("INSERT: ",hotelID,"Values: ", {
            ...values,
            averagePrice:0,
            address:{...values.address,
                doorNumber: 1
            }
        })
        const url = '/hotel'
        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                ...values,
                languages: values.languages.map((e)=>{return languagesData.find(element => element.initials == e)}),
                averagePrice:0,
                address:{...values.address,
                    doorNumber: 1
                }
            })
        })
        .then((response) => response.json())
        .then((response) => {
            //console.log("Response: ", response)
            if(response.auth){
                message.success('Hotel Created');
                props.onAction();
                props.setVisible(false);
            }else{
                message.error('Cant create Hotel');
            }
        })
    }
    //Update hotel
    const updateHotel = (hotelID, values) =>{
        //console.log("vou inserir")
        const url = '/hotel/' + hotelID
        //console.log("languages", values.languages.map((e)=>{return languagesData.find(element => element.initials == e)}))
        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                ...values,
                languages: values.languages.map((e)=>{return languagesData.find(element => element.initials == e)})
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.auth){
                message.success('Hotel Updated');
                props.setVisible(false)
            }else{
                message.error('Cant update Hotel');
            }
            
        })
    }

    

    useEffect(() => {
        //Inicializar valores default
        form.setFieldsValue({
            rating: 1
        })
        setHotel('');
        //Obter o Hotel
        if(props.selectedHotel._id)
        {
           getHotel(props.selectedHotel._id) 
        }

        //Carregar Clientes para formulario
        if(!clients == []){
            getClients()
            .then((values)=>{setClients(values)})
            .catch((err)=>{message.error('Cant find Clients')})
        }
        
        
        return () => {
            form.resetFields();
        };
        
    }, [props.selectedHotel,props.hotelID]);

    return (
        <>   
            <Drawer
                data-testid="drawer"
                title={(hotel._id) ? "Hotel: " + hotel.name : "New Hotel"}
                width={720}
                onClose={()=>{
                    if (props.visible) props.onCloseForm() 
                    props.setVisible(false)}}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={()=>props.setVisible(false)}>Cancel</Button>
                        <Button 
                            data-testid="btnSubmit"
                            form="formRoom"
                            type="primary" 
                            htmlType="submit"
                            >
                            {(hotel._id) ? "Update" : "Create"}
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
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter a number room' }]}
                        >
                            <Input placeholder="Please enter user number room" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="rating"
                            label="Rating"
                        >
                            <Rate allowHalf/>
                        </Form.Item>
                        
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="director"
                            label="Director"
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
                                        return <Option value= {val._id} key= {"clientsDirector" + val._id}>{val.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="employee"
                            label="Employees"
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
                                {
                                    clients.map((val)=>{
                                        return <Option value= {val._id} key= {"clientsEmployee" + val._id}>{val.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Drescription"
                        >
                            <TextArea showCount maxLength={500} style={{ height: 120 }} />
                        </Form.Item>
                    </Col>
                </Row>    
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            //name="adress"
                            name={['address', 'street']}
                            label="Adress"  
                        >
                            <Input placeholder="Street" />      
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            //name="adress"
                            name={['address', 'postCode']}
                            label="PostCode"  
                        >
                            <Input placeholder="postCode" />      
                        </Form.Item>  
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            //name="adress"
                            name={['address', 'district']}
                            label="district"  
                        >
                            <Input placeholder="district" />      
                        </Form.Item>  
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            //name="adress"
                            name={['address', 'locality']}
                            label="Locality"  
                        >
                            <Input placeholder="Locality" />      
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            //name="adress"
                            name={['address', 'country']}
                            label="Country"  
                        >
                            <Input placeholder="Country" />      
                        </Form.Item>  
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            //name="adress"
                            name={['address', 'doorNumber']}
                            label="Door Number"  
                        >
                            <Input placeholder="DoorNumber" />      
                        </Form.Item>  
                    </Col>
                </Row>


                <Row gutter={16}>
                    <Col span={12}>
                    <Form.List 
                            name="contacts"
                        >
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, curValues) =>
                                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                    }
                                >
                                    {() => (
                                        <Form.Item
                                        {...field}
                                        label="Type"
                                        name={[field.name, 'type']}
                                        rules={[{ required: true, message: 'Missing type' }]}
                                        >
                                        <Select style={{ width: 100 }}>
                                            <Option value={"email"}>Email</Option>
                                            <Option value={"telephone"}>Telephone</Option>
                                            <Option value={"fax"}>Fax</Option>
                                        </Select>
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="Contact"
                                    name={[field.name, 'contact']}
                                    rules={[{ required: true, message: 'Missing contact' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                            ))}

                            <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Contacts
                            </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="languages"
                            label="Languages"
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
                                <Option key={"pt"} value={"PT"}>Portuguese</Option>
                                <Option key={"en"} value={"EN"}>English</Option>
                                <Option key={"en"} value={"ES"}>Spanish</Option>
                                <Option key={"fr"} value={"FR"}>French</Option>
                                <Option key={"it"} value={"IT"}>Italian</Option>
                                <Option key={"de"} value={"DE"}>German</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>




            </Form>
            </Drawer>
        </>
    );
}

export default HotelsFormDrawer;
