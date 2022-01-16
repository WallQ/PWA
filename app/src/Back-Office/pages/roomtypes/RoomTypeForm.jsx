import React,{useState, useEffect} from 'react'
import { Navigate, useParams } from "react-router-dom";
import { Form, Input, InputNumber, Button, Space,Table, message, Select,Drawer,DatePicker,Col,Row,Upload, Modal } from 'antd';
import {getClients,getRoomTypes,getPacks,getRooms,getRoomType} from "../../services/Api"
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';


const { Option } = Select;

const actionType = {"INSERT": 0, "UPDATE" : 1, "REDIRECT": 2};


function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

const RoomTypeForm = (props) => {

    const [state, setState] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    });
    
    const handleCancel = () => setState({ ...state,previewVisible: false });

    const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }

        setState({
            ...state,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    const handleChange = ({ fileList }) => {
        setState({ fileList })
        console.log(state)
    };

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
        console.log("UPDATE VALUES: ", values)
        const url = '/roomTypes/' + params.id
        console.log("File List: ", state.fileList.filter(f => f.response.url))
        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                ...values,
                images: state.fileList.filter(f => f.response?.path).map(e => e.response?.path ),
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
                setState({
                    ...state,
                    fileList: roomType.images.map(item => {return {name: item, url:`http://localhost:3030/${item}`, response:{path: item}}})
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

    const { previewVisible, previewImage, fileList, previewTitle } = state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

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

                <Row gutter={16}>
                    <Col span={24}>
                        <FormItem
                            name="images"
                            label="Imagens"
                        >
                            <>
                                <Upload
                                    action="http://localhost:3030/roomTypes/uploads"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    accept=".png,.jpg,.PNG,.JPG"
                                    beforeUpload= {
                                        file => {
                                            
                                            const isPNG = ['image/png','image/PNG','image/jpeg','image/JPEG'].includes(file.type);
                                            console.log("Type: ", isPNG)
                                            if (!isPNG) {
                                              message.error(`${file.name} is not a png file`);
                                            }
                                            return isPNG || Upload.LIST_IGNORE;
                                          }
                                    }
                                    //customRequest={()=>{upload(fileList.map((e)=> {return e.url}))}}
                                >
                                {uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </>
                        </FormItem>
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
