import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Tabs, Card } from 'antd'
const TabPane = Tabs.TabPane

export default class UserCenter extends Component {
    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        comments: [],
        collections: [],
    }


    componentDidlMount() {
        if (sessionStorage.hasLogined) {
            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userId=${sessionStorage.UserId}`, { method: 'GET' })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({ comments: res })
                });
            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userId=${sessionStorage.UserId}`, { method: 'GET' })
                .then(res => res.json())
                .then(res => {
                    this.setState({ collections: res })
                });
        }

    }

    render() {
        const { comments, collections } = this.state;
        const commentList = comments.length
            ? comments.map((item, index) => (
                <Card key={index}>
                    {item}
                </Card>
            ))
            : '您还没有发表过任何评论~'

        const collectionList = collections.length
            ? collections.map((item, index) => (
                <Card key={index}>
                    {item}
                </Card>
            ))
            : '您还没有收藏任何的新闻，快去收藏吧~'
        return (
            <Row>
                <Col span={6} />
                <Col span={16}>
                    <Tabs>
                        <TabPane key='1' tab='我的评论列表'>
                            {commentList}
                        </TabPane>
                        <TabPane key='2' tab='我的收藏列表'>
                            {collectionList}
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}