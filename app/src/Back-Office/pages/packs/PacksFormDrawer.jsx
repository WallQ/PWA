import React,{useState, useEffect} from 'react'
import { Drawer,DatePicker,message,Form,InputNumber, Button, Col, Row, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const PacksFormDrawer = (props) => {


    //FORMULARIO
    const [form] = Form.useForm();

    const onFormFinish = (values) => {
        if(pack){
            updatePack(pack._id,values);
        
        }else{
            newRoomType(props.hotelID,values);
        }
        console.log("Submit Form: ",values)
      
    };
    const onFormFinishFailed = (data) => {
        //console.log(data);
    };

    //Dados do room
    const [pack, setPack] = useState('');

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
                setPack(data)
                form.setFieldsValue({
                    ...data,
                    date: [moment(data.start_date),moment(data.end_date)],
                    freeCancel: {value: data.freeCancel},
                });
                //form.setFieldsValue({packs: {value: data.roomType}})
            }  else{
                message.error('Cant find Room to Edit');
            }
        })
    }
    //NEW Room
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
    //Update Room
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
        if(props.selectedPack._id)
        {
           getPack(props.selectedPack._id) 
        }
        
        
        return () => {
            form.resetFields();
        };
        
    }, [props.selectedPack,props.hotelID]);

    return (
        <>   
            <Drawer
                title={(props.selectedPack) ? "Pack: " + props.selectedPack.name : "New Pack"}
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
                            {(props.selectedPack) ? "Update" : "Create"}
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
                            name="freeCancel"
                            label="Free Cancel"
                        >
                            <Select labelInValue >                   
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>                                    
                            </Select>
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

export default PacksFormDrawer;
