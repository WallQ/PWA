import React from "react";
import Enzyme, {render, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import HotelsFormDrawer from "./HotelsFormDrawer";

Enzyme.configure({adapter: new Adapter()});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: ()=>({
        pathName: "localhost:30001/example/path"
    })
}))

describe("HotelFormDrawer", ()=>{

    it('Open Drawer on Create Mode', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<HotelsFormDrawer/>);

        //Seleciona o Drawer
        let drawer = wrapper.find('[data-testid="drawer"]');
        //Titulo do drawer tem de ser "Hotel: " + Nome do quarto
        expect(drawer.prop('title')).toBe("New Hotel");

        //Carregar da propriedade extra
        const wrapperBtnSubmit = shallow(drawer.prop('extra'));
        //Selecionar o btnSubmit
        let btnSubmit = wrapperBtnSubmit.find('[data-testid="btnSubmit"]');
        //Se é create tem de dizer Create
        expect(btnSubmit.text()).toBe("Create");
        

    })

    it('Open Drawer on Update Mode', ()=>{
        
            window.fetch = jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        ok: true,
                        json: () => new Promise((resolve, reject) => {
                            resolve({
                                auth: true,
                                data: {
                                    _id: "61d209245040ee22b9bca2e7",
                                    name: "Corinthia",
                                    description: "The luxury of being a frequent traveller, made even more enjoyable by becoming a DISCOVERY Loyalty member. An exclusive club for those in the know. Choose from over 500 luxury hotels, in 76 countries to find your dream destination. Immerse yourself in the culture of your chosen location, with incredible Local Experiences. As you travel the world with us, you will earn more Local Experiences, uplifting your travels along the way. ",
                                    averagePrice: 100,
                                    rating: 4.5,
                                    languages: [
                                        {
                                        initials: "PT",
                                        country: "Portugal",
                                        language: "Portuguese",
                                        _id: "61d209245040ee22b9bca2e8"
                                        }
                                    ],
                                    address: {
                                        street: "Av. Columbano Bordalo Pinheiro",
                                        postCode: "1099-031",
                                        doorNumber: 105,
                                        district: "Lisboa",
                                        locality: "Lisboa",
                                        country: "Portugal",
                                        map: "",
                                        _id: "61d209245040ee22b9bca2ec"
                                    },
                                    contacts: [],
                                    facilities: [],
                                    url: "https://www.corinthia.com/",
                                    coverImage: {
                                        "path": "Corinthia/Corinthia.jpg",
                                        "alt": "Corinthia",
                                        "_id": "61d209245040ee22b9bca2f0"
                                    },
                                    images: [],
                                    reviews: [],
                                    director: "61d207e95040ee22b9bca2d5",
                                    employee: [
                                        "61d207a85040ee22b9bca2cf",
                                        "61d207b85040ee22b9bca2d1",
                                        "61d207cc5040ee22b9bca2d3"
                                    ],
                                    createdDate: "2022-01-02T20:20:52.986Z"
                                    }
                            });
                        })
                    });
                });
            })

            //Carregar o Componente
            const wrapper = shallow(<HotelsFormDrawer selectedHotel= {{_id: "61d209245040ee22b9bca2e7"}}/>);
            
            //Seleciona o Drawer
            let drawer = wrapper.find('[data-testid="drawer"]');
            //Titulo do drawer tem de ser "Hotel: " + Nome do quarto
            expect(drawer.prop('title')).toBe("Hotel: Corinthia");
    
            //Carregar da propriedade extra
            const wrapperBtnSubmit = shallow(drawer.prop('extra'));
            //Selecionar o btnSubmit
            let btnSubmit = wrapperBtnSubmit.find('[data-testid="btnSubmit"]');
            //Se é update tem de dizer Update
            expect(btnSubmit.text()).toBe("Update");


    })

    it('Open Drawer on Update Mode Props null', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<HotelsFormDrawer selectedHotel= {{}}/>);

        //Seleciona o Drawer
        let drawer = wrapper.find('[data-testid="drawer"]');
        //Titulo do drawer tem de ser "Hotel: " + Nome do quarto
        expect(drawer.prop('title')).toBe("New Hotel");

        //Carregar da propriedade extra
        const wrapperBtnSubmit = shallow(drawer.prop('extra'));
        //Selecionar o btnSubmit
        let btnSubmit = wrapperBtnSubmit.find('[data-testid="btnSubmit"]');
        //Se é create tem de dizer Create
        expect(btnSubmit.text()).toBe("Create");

    })

    it('Open Drawer on Update Mode whith bad ID', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<HotelsFormDrawer selectedHotel= {{_id: "dsdsdsd32d23d32d2d3"}}/>);

        //Seleciona o Drawer
        let drawer = wrapper.find('[data-testid="drawer"]');
        //Titulo do drawer tem de ser "Hotel: " + Nome do quarto
        expect(drawer.prop('title')).toBe("New Hotel");

        //Carregar da propriedade extra
        const wrapperBtnSubmit = shallow(drawer.prop('extra'));
        //Selecionar o btnSubmit
        let btnSubmit = wrapperBtnSubmit.find('[data-testid="btnSubmit"]');
        //Se é create tem de dizer Create
        expect(btnSubmit.text()).toBe("Create");

    })

})