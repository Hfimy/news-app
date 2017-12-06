import React,{Component} from 'react';
import {render} from 'react-dom';


import PcIndex from './pc/index';

class Root extends Component{
    
    render(){
        return (
            <PcIndex/>
        )
    }
}

render(<Root/>,document.getElementById('root'));



