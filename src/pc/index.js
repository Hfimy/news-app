import React from 'react';

import Header from './header';
import Footer from './footer';
import Container from './container'

import '../../public/style/pc.less'

export default () => (
    <div>
        <Header />
        <Container/>
        <Footer />
    </div>
)