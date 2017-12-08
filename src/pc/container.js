import React, { PureComponent } from 'react';

import { Row, Col, Carousel } from 'antd'

export default class Container extends PureComponent {

    render() {
        return (
            <Row class='container'>
                <Col span={2} />
                <Col span={20}>
                    <div class='carousel'>
                        <Carousel autoplay={true}>
                            <img src='./image/1.png' />
                            <img src='./image/2.jpeg' />
                            <img src='./image/3.jpeg' />
                            <img src='./image/4.jpeg' />
                        </Carousel>
                    </div>
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}