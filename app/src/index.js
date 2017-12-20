import React, { Component } from 'react';
import { render } from 'react-dom';
import MediaQuery from 'react-responsive';

import PcIndex from './pc/index';
import MbIndex from './mb/index';

import '../public/style/index.css'

class Root extends Component {

    render() {
        return [
            <MediaQuery key='pc' minDeviceWidth={668} component={PcIndex} />,
            <MediaQuery key='mb' maxDeviceWidth={667} component={MbIndex} />
        ]
    }
}

render(<Root />, document.getElementById('root'));



