import React,{useState, useEffect} from 'react'
import { Drawer,message,Form, Button, Col, Row, Input, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const RoomsFormDrawer = (props) => {

    //FORMULARIO
    const [form] = Form.useForm();

    const onFormFinish = (values) => {
        if(room){
            updateRoomType(room._id,values);
            
        }else{
            newRoomType(props.hotelID,values); 
        }
        console.log("Submit Form: ",values)
      
    };
    const onFormFinishFailed = (data) => {
        //console.log(data);
    };

    //Dados do room
    const [room, setRoom] = useState('');

    //GET os dados do ROOMTYPE
    const getRoom = (id) =>{

        const url = '/rooms/' + id

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {status, data,message} = response;
            
            if(data){
                    setRoom(data)
                    form.setFieldsValue(data);
            }  else{
                message.error('Cant find Room to Edit');
            }
        })
    }
    //NEW Room
    const newRoomType = (hotelID,values) =>{
        console.log("INSERT: ",hotelID,"Values: ", values)
        const url = '/rooms'

        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                ...values,
                hotel: hotelID
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.auth){
                message.success('Rooom Created');
            }else{
                message.error('Cant create Rooom');
            }
        })
    }
    //Update Room
    const updateRoomType = (roomID, values) =>{
        //console.log("vou inserir")
        const url = '/rooms/' + roomID

        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                ...values,
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
        if(props.selectedRoom._id)
        {
           getRoom(props.selectedRoom._id) 
        }
        
        return () => {
            if(!props.visible){
              props.onCloseForm()  
            }
            
        };
        
    }, [props.selectedRoom]);
    return (
        <>
            
            <Drawer
            title={(props.selectedRoom) ? "Number Room: " + props.selectedRoom.number : "New Room"}
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
                        {(props.selectedRoom) ? "Update" : "Create"}
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
                        name="number"
                        label="Number"
                        rules={[{ required: true, message: 'Please enter a number room' }]}
                        >
                        <Input placeholder="Please enter user number room" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    </Col>
                </Row>
            </Form>
            </Drawer>
        </>
    );
}

export default RoomsFormDrawer;
