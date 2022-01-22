import React from "react";
import Enzyme, {render, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import StarRating from ".";

Enzyme.configure({adapter: new Adapter()});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: ()=>({
        pathName: "localhost:30001/example/path"
    })
}))

describe("StarRating", ()=>{

    beforeEach(()=>{

    })

    it('Send normal rating', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<StarRating rating={3}/>);

        //Seleciona o Menu
        expect(wrapper.find('[data-testid="star"]')).toHaveLength(3)
        expect(wrapper.find('[data-testid="halfStar"]')).toHaveLength(0)
        
    })
    it('Send half rating', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<StarRating rating={3.5}/>);

        //Seleciona o Menu
        expect(wrapper.find('[data-testid="star"]')).toHaveLength(3)
        expect(wrapper.find('[data-testid="halfStar"]')).toHaveLength(1)
    
    })
    it('Send a negative rating', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<StarRating rating={-3}/>);

        //Seleciona o Menu
        expect(wrapper.find('[data-testid="star"]')).toHaveLength(0)
        expect(wrapper.find('[data-testid="halfStar"]')).toHaveLength(0)
        
    })
    it('Send a undefined rating', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<StarRating rating={undefined}/>);

        //Seleciona o Menu
        expect(wrapper.find('[data-testid="star"]')).toHaveLength(0)
        expect(wrapper.find('[data-testid="halfStar"]')).toHaveLength(0)
        
    })
    it('Send a null rating', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<StarRating rating={null}/>);

        //Seleciona o Menu
        expect(wrapper.find('[data-testid="star"]')).toHaveLength(0)
        expect(wrapper.find('[data-testid="halfStar"]')).toHaveLength(0)
        
    })
    it('Dont send any params', ()=>{
        //Carregar o Componente
        const wrapper = shallow(<StarRating />);

        //Seleciona o Menu
        expect(wrapper.find('[data-testid="star"]')).toHaveLength(0)
        expect(wrapper.find('[data-testid="halfStar"]')).toHaveLength(0)
        
    })


})