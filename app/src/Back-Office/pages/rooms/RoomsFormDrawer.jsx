import React,{useState, useEffect} from 'react'
import { Drawer,message,Form, Button, Col, Row, Input, Select, Space, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

const RoomsFormDrawer = (props) => {

    const [upload, setUpload] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            //percent: 100,
            //status: 'error',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        ]
    });


    const handleCancel = () =>{
        setUpload({ previewVisible: false })
    }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }

        setUpload({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    const handleChangeUpload = ({ fileList }) => setUpload({ fileList });

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

    const handleChange = (value) => {
        console.log(value);
      }

    //Dados do room
    const [room, setRoom] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);

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
                //console.log("GETROOM: ", data)
                    setRoom(data)
                    form.setFieldsValue({number: data.number});
                    form.setFieldsValue({roomType: {value: data.roomType}})
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
                number: values.number,
                roomType: values.roomType.value,
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
                number:values.number,
                roomType: values.roomType.value
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

    //GET os dados do ROOMTYPE
    const getAllRoomType = () =>{

        const url = '/hotel/'+ props.hotelID +'/roomTypes'

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {auth, data} = response;
            if(auth){
                //console.log("DATA: ",data.roomTypes)
                setRoomTypes(data.roomTypes)  
            }else{
                message.error('Cant find RooomRypes from hotel');
            }
        })
    }

    
    

    useEffect(() => {

        if(props.hotelID){
            getAllRoomType()
        }
        if(props.selectedRoom._id)
        {
           getRoom(props.selectedRoom._id) 
        }
        
        
        return () => {
            if(!props.visible){
              props.onCloseForm()  
            }
            
        };
        
    }, [props.selectedRoom,props.hotelID]);

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
                        <Form.Item
                            name="roomType"
                            label="Room Type"
                        >
                            <Select
                                labelInValue
                                onChange={handleChange}
                            >
                                {
                                    roomTypes.map((val)=>{
                                        return <Option value={val._id} key={val._id}>{val.name}</Option>
                                    })
                                    
                                }
                            </Select>
                        </Form.Item>
                        
                    </Col>
                </Row>
            </Form>
            </Drawer>
        </>
    );
}

export default RoomsFormDrawer;
