import React, { PureComponent } from 'react';
import {BackTop} from 'antd'

import Header from '../component/header';
import Footer from '../../common/footer';

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <Header />
                <main>
                    {this.props.children}
                </main>
                <Footer />
                <BackTop/>
            </div>
        )
    }
}