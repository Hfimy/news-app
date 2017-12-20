import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ImageList from '../component/imageList'
import Comment from '../../common/comment'

import { Row, Col, message } from 'antd'
import { handleResponse } from '../../common/util'

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
        document.title='React News'
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
        const typeMap=new Map([
            ['头条','top'],['娱乐','yule'],['军事','junshi'],['财经','caijing'],['国际','guoji'],['国内','guonei'],['科技','keji'],['时尚','shishang']
        ])
        const type=typeMap.get(newsItem.realtype);
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
                <Col span={2} />
            </Row>
        )
    }
}