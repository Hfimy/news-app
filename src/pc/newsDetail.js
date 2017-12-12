import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ImageList from './imageList'
import Comment from '../common/comment'

import { Row, Col } from 'antd'

export default class Detail extends Component {

    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        newsItem: {},
    }

    componentWillMount() {
        if (this.props.params && this.props.params.uniquekey !== undefined) {
            this.updateDetail(this.props.params.uniquekey);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.params && nextProps.params.uniquekey) {
            if (nextProps.params.uniquekey !== this.props.params.uniquekey) {
                this.updateDetail(nextProps.params.uniquekey)
            }
        }
        return true;
    }

    updateDetail = (key) => {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${key}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ newsItem: response }, () => {
                    document.title = this.state.newsItem.title
                })
            })
    }

    render() {
        const { newsItem } = this.state;
        let type;
        switch (newsItem.realtype) {
            case '头条':
                type = 'top';
                break;
            case '娱乐':
                type = 'yule';
                break;
            case '军事':
                type = 'junshi';
                break;
            case '财经':
                type = 'caijing';
                break;
            case '国际':
                type = 'guoji';
                break;
            case '国内':
                type = 'guonei';
                break;
            case '科技':
                type = 'keji';
                break;
            case '时尚':
                type = 'shishang';
                break;
            default:
                type = 'top'
                break;
        }
        return (
            <Row>
                <Col span={6} />
                <Col span={10}>
                    <div class='news-detail' dangerouslySetInnerHTML={{ __html: newsItem.pagecontent }}></div>
                    <Comment uniquekey={newsItem.uniquekey} />
                </Col>
                <Col span={6} offset={1}>
                    <ImageList cardTitle='相关新闻' type={type} cardWidth='80%' imgWidth='130px' count={30} />
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}