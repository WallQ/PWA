import React,{useState, useEffect} from 'react'
import { Navigate, useParams } from "react-router-dom";
import { Form, Input, InputNumber, Button, Space,Table, message, Select,Drawer,DatePicker,Col,Row } from 'antd';
import {getClients,getRoomTypes,getPacks,getRooms,getRoomType} from "../../services/API"
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const actionType = {"INSERT": 0, "UPDATE" : 1, "REDIRECT": 2};

const RoomTypeForm = (props) => {

    //Redirect Use State
    const [formAction, setFormAction] = useState(actionType.INSERT);

    //Todos os Rooms
    const [roomPacks, setPacks] = useState([]);
    
    //ID do roomtype recebido no URL
    let params = useParams();


    //NEW RoomType
    const newRoomType = (values) =>{
        //console.log("vou inserir")
        const url = '/roomTypes'

        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                ...values,
                hotel: props.hotelID,
                priceByMonth: [],
                priceExtraDays : []
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("Update Auth: ", response.auth);
            if(response.auth){
                message.success('RooomType Created');
            }else{
                message.error('Cant create RooomType');
            }
        })
    }
    //Update RoomType
    const updateRoomType = (values) =>{
        //console.log("vou inserir")
        const url = '/roomTypes/' + params.id

        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                ...values,
                priceByMonth: [],
                priceExtraDays : []
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.auth){
                message.success('RooomType Updated');
            }else{
                message.error('Cant update RooomType');
            }
            
        })
    }

    //FORMULARIO
    const [form] = Form.useForm();
    const onFormFinish = (values) => {
        console.log("Dados do form submit", values);
        if(formAction == actionType.INSERT){
            newRoomType(values);
        }else{
            //console.log("update")
            updateRoomType(values);
        }
      
    };
    const onFormFinishFailed = (data) => {
        //console.log(data);
    };
  


    //Useefect
    useEffect(() => {

        //Set Default values Form
        form.setFieldsValue({price: 0, maxGuest:2, maxGuestChild:1})

        //Carregar Packs para formulario
        if(props.hotelID){
            getPacks(props.hotelID)
            .then((values)=>{
                
                setPacks(values)})
            .catch((err)=>{message.error('Cant find Packs')})
        }

        //Carregar os dados do RoomType
        if(params.id){
            getRoomType(params.id)
            .then((roomType)=>{
                form.setFieldsValue({
                    ...roomType,
                    packs: roomType.packs.map((item) => {return item._id})
                })
                setFormAction(actionType.UPDATE)
            })
            .catch(()=> setFormAction(actionType.REDIRECT)) 
        } 
        
        return () =>{}
    }, [props.hotelID]);

    //Redirecionamento caso o id nao exista
    if(formAction == actionType.REDIRECT){
       return <Navigate to={'/admin'}/>
    }

    return (
      
        <div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
                autoComplete="off"
                >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Nome"
                            rules={[
                                {required: true},
                                {type: 'string', warningOnly: true},
                                {type: 'string', min: 6}
                            ]}
                        >
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            name="description" 
                            label="Description"
                            >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item 
                            name={'maxGuest'} 
                            label="Max People"
                        >
                            <InputNumber 
                                style={{ width: '100%' }}
                                addonBefore="People" 
                                min={0} 
                                max={6}
                            />
                        </Form.Item>    
                    </Col>
                    <Col span={4}>
                        <Form.Item style={{ width: '100%' }} name={'maxGuestChild'} label="Max People Children">
                            <InputNumber addonBefore="Child" min={0} max={4}/>
                        </Form.Item>  
                    </Col>
                    <Col span={4}>
                        <Form.Item name={'area'} label="Area m2">
                            <InputNumber style={{ width: '100%' }} addonBefore="m2" min={0} max={300}/>
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="packs"
                            label="PAcks"
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
                                {
                                    roomPacks.map((val)=>{
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
                            name="price"
                            label="Price"
                    >
                        <InputNumber addonAfter="€" />
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.List
                            name="facilities"
                            label="Facilities"
                            >
                            {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label={index === 0 ? 'Feature' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input Feature",
                                            },
                                        ]}
                                        noStyle
                                        >
                                        <Input placeholder="feature name" style={{ width: '55%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                
                                <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                            )}
                            
                        </Form.List>
                    </Col>
                </Row>
 

                <Form.Item>
                    <Space>
                    <Button type="primary" htmlType="submit">
                        {(params.id)? "Update" : "Create"}
                    </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RoomTypeForm;
