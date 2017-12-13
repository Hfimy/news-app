import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Tabs, Card, message,Avatar,Upload,Icon } from 'antd'
const TabPane = Tabs.TabPane

export default class UserCenter extends PureComponent {
    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        comments: [],
        collections: [],
        loading:false
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
    handleChange=(info)=>{
        // if(info.file.status==='uploading'){
        //     this.setState({loading:true});
        //     return;
        // }
        // if(info.file.status==='done'){

        // }
        console.log('onChange')
    }
    beforeUpload=()=>{
        console.log('before')
    }
    render() {
        const { comments, collections ,imageUrl,loading} = this.state;
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
        const uploadButton=(
            <div>
                <Icon type={loading?'loading':'plus'}/>
                <div class='ant-upload-text'>Upload</div>
            </div>
        )
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
                        <TabPane key='3' tab='我的个人资料'>
                            <Avatar size='large' icon='user' />
                            <Upload
                                name='avatar'
                                listType='picture-card'
                                class='avatar-uploader'
                                showUploadList={false}
                                action=''
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}>
                                {imageUrl?<img src={imageUrl} alt=''/>:uploadButton}
                            </Upload>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={4} />
            </Row>
        )
    }
}