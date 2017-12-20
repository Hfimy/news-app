import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import InfiniteScroll from 'react-infinite-scroller';

import { Link } from 'react-router'

import { handleResponse } from '../../common/util'

//添加发布订阅库，实现跨组件间通信
import PubSub from 'pubsub-js'

import { Row, Col, Tabs, Card, message, Avatar, Upload, Icon, Modal, List, Spin, Button } from 'antd'
const TabPane = Tabs.TabPane



export default class UserCenter extends PureComponent {
    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        comments: [],
        collections: [],
        avatarUrl: '',
        loading: false,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
        Loading: true,
        loadingMore: false,

        commentLoading: false,
        hasMore: true,
    }
    componentWillMount() {
        this._isMounted = true;
        if (sessionStorage.hasLogined) {
            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userId=${sessionStorage.UserId}`, { method: 'GET' })
                .then(handleResponse)
                .then(res => {
                    if (this._isMounted) {
                        this.setState({ comments: res })
                    }
                }).catch(e => message.error('请求出错了'))

            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userId=${sessionStorage.UserId}`, { method: 'GET' })
                .then(handleResponse)
                .then(res => {
                    if (this._isMounted) {
                        this.setState({ collections: res, Loading: false })
                    }
                }).catch(e => message.error('请求出错了'))
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this.state.avatarUrl) {
            URL.revokeObjectURL(this.state.avatarUrl)
        }
    }

    beforeUpload = (file) => {
        if (!/jpe?g|png$/.test(file.type)) {
            message.error('不支持的图片格式');
            file.flag = true;
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小超过限制(2M)');
            file.flag = true;
            return false;
        }
        return true;
    }


    uploadAvatar = (obj) => {
        const form = new FormData();
        form.append('name', obj.filename)
        form.append('file', obj.file)


        this.setState({ loading: true })

        fetch(obj.action, { method: 'POST', body: form })
            // .then(handleResponse)
            .then(res => {
                if (this._isMounted) {
                    if (res.status === 200 || res.status === 201) {
                        message.success('上传成功！')
                        if (this.state.avatarUrl) {
                            URL.revokeObjectURL(this.state.avatarUrl)
                        }
                        const avatarUrl = URL.createObjectURL(obj.file);
                        this.setState({ avatarUrl })
                        PubSub.publish('CHANGE_AVATAR', avatarUrl)
                    } else {
                        message.error('上传失败')
                    }
                    this.setState({ loading: false })
                }

            }).catch(e => {
                if (this._isMounted) {
                    message.error('上传出错了');
                    this.setState({ loading: false })
                }
            })
    }

    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }

    //自定义实现onChange事件效果
    uploadPic = (obj) => {
        const form = new FormData();
        form.append('name', obj.filename)
        form.append('file', obj.file)

        const file = obj.file, fileList = this.state.fileList.slice();
        file.status = 'uploading';
        fileList.push(file)
        if (this._isMounted) {
            this.setState({ fileList })
        }

        fetch(obj.action, { method: 'POST', body: form })
            // .then(handleResponse)
            .then(res => {
                if (this._isMounted) {
                    if (res.status === 200 || res.status === 201) {
                        file.status = 'done'
                        const fileList = this.state.fileList.slice()
                        this.setState({ fileList })
                    } else {
                        file.status = 'error'
                        const fileList = this.state.fileList.slice();
                        if (this._isMounted) {
                            this.setState({ fileList })
                        }
                    }
                }
            }).catch(error => {
                if (error.status) {
                    message.error(error.statusText.toString());
                } else {
                    message.error('请求失败！')
                }
                file.status = 'error'
                const fileList = this.state.fileList.filter((item, index) => {
                    if (item.status === 'error') {
                        return false;
                    }
                    return true;
                })
                if (this._isMounted) {
                    this.setState({ fileList })
                }
            })
    }
    handleChange = ({ fileList, file }) => {
        if (file.flag) {
            return;
        }
        const newFileList = fileList.filter((item, index) => {
            if (item.status === 'error') {
                return false;
            }
            return true;
        })
        if (this._isMounted) {
            this.setState({ fileList: newFileList })
        }
    }
    onLoadMore = () => {
        this.setState({ loadingMore: true })
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userId=${sessionStorage.UserId}`, { method: 'GET' })
            .then(handleResponse)
            .then(res => {
                if (this._isMounted) {
                    this.setState({ collections: res, loadingMore: false }, () => {
                        window.dispatchEvent(new Event('resize'))
                    })
                }
            }).catch(e => message.error('请求出错了'))

    }
    handleInfiniteOnLoad = () => {
        const comments = this.state.comments;
        this.setState({ commentLoading: true })

        if (comments > 30) {
            message.warnint('Infinite List loaded all')
            if (this._isMounted) {
                this.setState({
                    commentLoading: false,
                    hasMore: false
                })
            }
            return;
        }
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userId=${sessionStorage.UserId}`, { method: 'GET' })
            .then(handleResponse)
            .then(res => {
                if (this._isMounted) {
                    this.setState({ collections: res, commentLoading: false })
                }
            }).catch(e => {
                message.error('请求出错了')
                this.setState({commentLoading:false})
            })
    }
    render() {
        const { comments, collections, avatarUrl, loading, previewVisible, previewImage, fileList, Loading, loadingMore } = this.state;
        const loadMore =
            <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 8, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
            </div>



        const uploadAvaButton = (
            <div class='upload-btn'>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div>上传头像</div>
            </div>
        )
        const uploadPicButton = (
            <div class='upload-btn'>
                <Icon type='plus' />
                <div>上传照片</div>
            </div>
        )
        return (

            <Row>
                <Col span={6} />
                <Col span={12}>
                    <Tabs defaultActiveKey='1'>
                        <TabPane class='userpic-container' key='1' tab='我的个人资料'>
                            <div>
                                <a id='avatar' href='#'><Avatar class='avatar-container' size='large' icon='user' src={avatarUrl} /></a>
                                <Upload
                                    name='avatar'
                                    listType='picture-card'
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    beforeUpload={this.beforeUpload}
                                    customRequest={this.uploadAvatar}
                                >
                                    {uploadAvaButton}
                                </Upload>
                            </div>
                            <div>
                                <Upload
                                    class='upload-pic'
                                    listType='picture-card'
                                    action='//jsonplaceholder.typicode.com/posts/'
                                    fileList={fileList}
                                    beforeUpload={this.beforeUpload}
                                    onPreview={this.handlePreview}
                                    multiple={true}
                                    // customRequest={this.uploadPic}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 6 ? null : uploadPicButton}
                                </Upload>
                                <Modal class='upload-modal' visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt='' src={previewImage} />
                                </Modal>
                            </div>
                        </TabPane>
                        
                        <TabPane class='demo-infinite-container' key='2' tab='我的评论列表'>
                            <InfiniteScroll
                                initialLoad={false}
                                pageStart={0}
                                loadMore={this.handleInfiniteOnLoad}
                                hasMore={!this.state.commentLoading && this.state.hasMore}
                                useWindow={false}
                            >
                                <List
                                    size='large'
                                    dataSource={comments}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={`您于 ${item.datetime} 评论了文章 ${item.uniquekey} `}
                                                description={item.Comments}
                                            />
                                            <Link to={`/detail/${item.uniquekey}`} target='_blank'>查看</Link>
                                        </List.Item>
                                    )}>
                                    {this.state.commentLoading && this.state.hasMore && <Spin class='demo-loading' />}
                                </List>
                            </InfiniteScroll>
                        </TabPane>
                        <TabPane key='3' tab='我的收藏列表'>
                            <List
                                size='large'
                                loading={Loading}
                                loadMore={loadMore}
                                dataSource={collections}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={item.Title}
                                        />
                                        <Link to={`/detail/${item.uniquekey}`} target='_blank'>查看</Link>
                                    </List.Item>
                                )} />
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={6} />
            </Row>
        )
    }
}