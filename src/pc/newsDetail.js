import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ImageList from './imageList'
import Comment from '../common/comment'

import { Row, Col, message } from 'antd'
import { handleResponse } from '../common/util'

export default class Detail extends PureComponent {

    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        newsItem: {},
    }

    componentWillMount() {
        this._isMounted = true;
        if (this.props.params && this.props.params.uniquekey !== undefined) {
            this.updateDetail(this.props.params.uniquekey);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && nextProps.params.uniquekey) {
            if (nextProps.params.uniquekey !== this.props.params.uniquekey) {
                this.updateDetail(nextProps.params.uniquekey)
            }
        }
    }

    updateDetail = (key) => {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${key}`, { method: 'GET' })
            .then(handleResponse)
            .then(res => {
                if (this._isMounted) {
                    this.setState({ newsItem: res }, () => {
                        document.title = this.state.newsItem.title
                    })
                }
            }).catch(e => message.error('请求出错了'))
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
                type = undefined;
                break;
        }
        return (
            <Row>
                <Col span={6} />
                <Col span={9}>
                    <div class='news-detail' dangerouslySetInnerHTML={{ __html: newsItem.pagecontent ? newsItem.pagecontent : '正在加载中...' }}></div>
                    <Comment uniquekey={newsItem.uniquekey} />
                </Col>
                <Col span={6} offset={1}>
                    {type ? <ImageList cardTitle='相关新闻' count={30} type={type} cardWidth='80%' imgWidth='130px' /> : '正在加载中'}
                </Col>
                <Col span={3} />
            </Row>
        )
    }
}