import React,{useState, useEffect} from 'react'
import { Drawer,DatePicker,message,Form,InputNumber, Button, Col, Row, Input, Select, Space,Rate } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import {getClients,getRoomTypes,getPacks,getRooms} from "../../services/Api"

const { Option } = Select;
const { RangePicker } = DatePicker;

const HotelsFormDrawer = (props) => {


    //FORMULARIO
    const [form] = Form.useForm();

    const onFormFinish = (values) => {
        if(hotel){
            updatePack(hotel._id,values);
        
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
                setHotel(data)
                form.setFieldsValue({
                    ...data,
                    date: [moment(data.start_date),moment(data.end_date)],
                    freeCancel: {value: data.freeCancel},
                });
            }  else{
                message.error('Cant find Hotel to Edit');
            }
        })
    }
    //NEW hotel
    const newRoomType = (hotelID,values) =>{
        console.log("INSERT: ",hotelID,"Values: ", values)
        const url = '/packs'
        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                hotel: hotelID,
                name:values.name,
                include:values.include,
                dailyPrice:values.dailyPrice,
                freeCancel: values.freeCancel.value,
                start_date: values.date[0]._d,
                end_date: values.date[1]._d,
                maxGuests: 0,
                maxGuestsChild: 0,
                minNights: 1
            })
        })
        .then((response) => response.json())
        .then((response) => {
            //console.log("Response: ", response)
            if(response.auth){
                message.success('Rooom Created');
                props.onAction();
                props.setVisible(false);
            }else{
                message.error('Cant create Rooom');
            }
        })
    }
    //Update hotel
    const updatePack = (packID, values) =>{
        //console.log("vou inserir")
        const url = '/packs/' + packID

        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                name:values.name,
                include:values.include,
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
        //Inicializar valores default
        form.setFieldsValue({
            freeCancel: {value: true},
            dailyPrice: 0,
            date: [moment(), moment().add(1,'days')]
        })

        //Obter os PAcks
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
                title={(props.selectedHotel) ? "Hotel: " + props.selectedHotel.name : "New Pack"}
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
                            form="formRoom"
                            type="primary" 
                            htmlType="submit"
                            >
                            {(props.selectedHotel) ? "Update" : "Create"}
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
                            name="dailyPrice"
                            label="Price"
                        >
                            <InputNumber addonAfter="€"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label="Start / End Date"
                        >
                            <RangePicker
                                
                                
                                format={'DD/MM/YYYY'}/>  
                        </Form.Item>
                         
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.List
                            name="include"
                            label="Features"
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
                    <Col span={12}>
                       
                    </Col>
                </Row>
                
            </Form>
            </Drawer>
        </>
    );
}

export default HotelsFormDrawer;
