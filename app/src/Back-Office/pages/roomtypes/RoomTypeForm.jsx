import React,{useState, useEffect} from 'react'
import { Navigate, useParams } from "react-router-dom";
import { Form, Input, InputNumber, Button, Space,Table, message, Select } from 'antd';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const RoomTypeForm = () => {


    const actionType = {"INSERT": 0, "UPDATE" : 1, "REDIRECT": 2};

    //ID do roomty recebido no LINK
    let params = useParams();

    const [formAction, setFormAction] = useState(actionType.INSERT);

    const [selectedRowKeys, setSelectedRowKeys] = useState(['61a04a0ab218cafaf8b2a05c']);

    //Dados do roomtype
    const [roomType, setRoomType] = useState({});

    //GET os dados do ROOMTYPE
    const getRoomType = () =>{

        const url = '/roomTypes/' + params.id

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {status, data,message} = response;
            
            if(data){
                
                setRoomType(data)
                console.log(roomType)
                //Carregar dados para o form
                form.setFieldsValue(data);

                setFormAction(actionType.UPDATE)
            }  else{
                setFormAction(actionType.REDIRECT)
            }
        })
    }
    //NEW RoomType
    const newRoomType = (values) =>{
        console.log("vou inserir")
        const url = '/roomTypes'

        fetch(url,{
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                ...values,
                hotel:"61a0479f82d81d49a844e191",
                packs: [],
                facilities: [],
                priceByMonth: [],
                priceExtraDays : []
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            message.success('RooomType created');
        })
    }

    //FORMULARIO
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Dados do form submit", values);
        //Se roomtype tiver dados o form é para alterar
        console.log(formAction)
        console.log(formAction.INSERT)
        if(formAction == actionType.INSERT){
            newRoomType(values);
        }else{
            console.log("update")
            //update
        }
      
    };
  
    const onFinishFailed = (data) => {
        console.log(data);
    };
  
    const onFill = () => {
        form.setFieldsValue(roomType); 
    };


    //Useefect
    useEffect(() => {
        if(params.id){
            getRoomType()
        } 
        return () =>{}
    }, []);

    //Redirecionamento caso o id nao exista

    if(formAction == actionType.REDIRECT){
       return <Navigate to={'/admin'}/>
    }


    


    return (
        
        <div>
            <h1>{params.id}</h1>
            
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    name="name"
                    label="URL"
                    rules={[
                    {
                        required: true,
                    },
                    {
                        type: 'string',
                        warningOnly: true,
                    },
                    {
                        type: 'string',
                        min: 6,
                    },
                    ]}
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
                
                <Form.Item name={'description'} label="Description">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name={'maxGuest'} label="Max People">
                    <InputNumber addonBefore="People" min={0} max={6}/>
                </Form.Item>

                <Form.Item name={'maxGuestChild'} label="Max People Children">
                    <InputNumber addonBefore="Child" min={0} max={4}/>
                </Form.Item>

                <Form.Item name={'area'} label="Area m2">
                    <InputNumber addonBefore="m2" min={0} max={300}/>
                </Form.Item>

                <Form.Item>
                    <Table
                        rowSelection={{
                            selectedRowKeys,
                            type: 'checkbox',
                            onChange: (selectedRowKeys, selectedRows) => {
                                setSelectedRowKeys(selectedRowKeys);
                                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                            },   
                        }}
                        rowKey={record => record._id}
                        columns={[
                            {
                              title: 'Name',
                              dataIndex: 'name',
                            },
                            {
                              title: 'Price',
                              dataIndex: 'dailyPrice',
                            }
                          ]}
                        dataSource={roomType.packs}
                    />
                </Form.Item>

                <Form.Item>
                    <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onFill}>
                        Fill
                    </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RoomTypeForm;
