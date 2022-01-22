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

    it.only('Open Drawer on Update Mode', ()=>{
        


            //Carregar o Componente
            const wrapper = shallow(<HotelsFormDrawer selectedHotel= {{_id: "61d2091e5040ee22b9bca2d9"}}/>);
    
            window.getHotel = jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        ok: true,
                        json: () => new Promise((resolve, reject) => {
                            resolve({
                                'data': {
                                    _id: "61d2091e5040ee22b9bca2d9",
                                    name: "Avenida Palace"
                                }
                            });
                        })
                    });
                });
            })
    
            
            //Seleciona o Drawer
            let drawer = wrapper.find('[data-testid="drawer"]');
            //Titulo do drawer tem de ser "Hotel: " + Nome do quarto
            expect(drawer.prop('title')).toBe("Hotel: Avenida Palace");
    
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

})