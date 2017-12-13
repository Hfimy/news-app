import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Tabs, Card, message } from 'antd'
const TabPane = Tabs.TabPane

export default class UserCenter extends PureComponent {
    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        comments: [],
        collections: [],
    }

    componentWillMount() {
        this._isMounted = true;
        if (sessionStorage.hasLogined) {
            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userId=${sessionStorage.UserId}`, { method: 'GET' })
                .then(res => res.json())
                .then(res => {
                    if (this._isMounted) {
                        this.setState({ comments: res })
                    }
                }).catch(e => message.error('请求出错了'))

            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userId=${sessionStorage.UserId}`, { method: 'GET' })
                .then(res => res.json())
                .then(res => {
                    if (this._isMounted) {
                        this.setState({ collections: res })
                    }
                }).catch(e => message.error('请求出错了'))
        }

    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { comments, collections } = this.state;
        const commentList = comments.length
            ? comments.map((item, index) => (
                <Card key={index}>
                    {item.Comments}
                </Card>
            ))
            : '您还没有发表过任何评论~'

        const collectionList = collections.length
            ? collections.map((item, index) => (
                <Card key={index}>
                    {item.Title}
                </Card>
            ))
            : '您还没有收藏任何的新闻，快去收藏吧~'
        return (
            <Row>
                <Col span={6} />
                <Col span={14}>
                    <Tabs>
                        <TabPane key='1' tab='我的评论列表'>
                            {commentList}
                        </TabPane>
                        <TabPane key='2' tab='我的收藏列表'>
                            {collectionList}
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={4} />
            </Row>
        )
    }
}