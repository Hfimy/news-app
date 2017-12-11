import React, { Component } from 'react';
import {BackTop} from 'antd'

import Header from './header';
import Footer from './footer';

export default class App extends Component {
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