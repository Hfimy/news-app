import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ImagesList from './imagesList'
import Comment from '../common/comment'

import { Row, Col } from 'antd'

export default class Detail extends Component {

    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        newsItem: '',
    }
    componentDidMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.shouldUpdate = false;
                this.setState({ newsItem: response }, () => {
                    document.title = this.state.newsItem.title
                })
            })
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.params.uniquekey) {
            if (nextProps.params.uniquekey !== this.props.params.uniquekey) {
                this.shouldUpdate = true;
            }
        }

        return true;
    }
    componentDidUpdate() {
        if (this.shouldUpdate) {
            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`, { method: 'GET' })
                .then(response => response.json())
                .then(response => {
                    this.shouldUpdate = false;
                    this.setState({ newsItem: response }, () => {
                        document.title = this.state.newsItem.title
                    })
                })
        }
    }
    render() {
        const { newsItem } = this.state;
        let type;
        console.log(newsItem.realtype)
        switch(newsItem.realtype){
            case '头条':
                type='top';
                break;
            case '娱乐':
                type='yule';
                break;
            case '军事':
                type='junshi';
                break;
            case '财经':
                type='caijing';
                break;
            case '国际':
                type='guoji';
                break;
            case '国内':
                type='guonei';
                break;
            case '科技':
                type='keji';
                break;
            case '时尚':
                type='shishang';
                break;
            default:
                type='top'
                break;
        }
        return (
            <Row>
                <Col span={6} />
                <Col span={10}>
                    <div class='news-detail' dangerouslySetInnerHTML={{ __html: newsItem.pagecontent }}></div>
                    <Comment />
                </Col>
                <Col span={6} offset={1}>
                    <ImagesList cardTitle='相关新闻' type={type} cardWidth='80%' imgWidth='130px' count={30} />
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}