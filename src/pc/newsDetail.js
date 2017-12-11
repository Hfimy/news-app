import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ImagesList from './imagesList'

import { Row, Col } from 'antd'

export default class Detail extends PureComponent {

    static propTypes = {

    }
    static defaultProps = {

    }

    render() {
        return (
            <Row>
                <Col span={6} />
                <Col span={10}>
                    {this.props.children?this.props.children:<p class='empty-news'>这里是空的哦~</p>}
                </Col>
                <Col span={6} offset={1}>
                    <ImagesList cardTitle='相关新闻' type='top' cardWidth='80%' imgWidth='130px' count={30}/>
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}