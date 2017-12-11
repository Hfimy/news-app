import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ImagesList from './imagesList'
import Comment from '../common/comment'

import { Row, Col } from 'antd'

export default class Detail extends PureComponent {

    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        newsItem: ''
    }
    componentWillMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ newsItem: response }, () => {
                    document.title = this.state.newsItem.title
                })
            })
    }
    render() {
        const {newsItem}=this.state;
        return (
            <Row>
                <Col span={6} />
                <Col span={10}>
                    <div class='news-detail' dangerouslySetInnerHTML={{ __html: newsItem.pagecontent }}></div>
                    <Comment/>
                </Col>
                <Col span={6} offset={1}>
                    <ImagesList cardTitle='相关新闻' type={newsItem.type} cardWidth='80%' imgWidth='130px' count={30} />
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}