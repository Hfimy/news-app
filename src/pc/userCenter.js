import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Tabs, Card, message, Avatar, Upload, Icon, Modal } from 'antd'
const TabPane = Tabs.TabPane

export default class UserCenter extends Component {
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
        fileList: [],
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

    beforeUpload = (file) => {
        
        if (!/jpe?g|png$/.test(file.type)) {
            message.error('不支持的图片格式');
            file.flag=true;
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小超过限制(2M)');
            file.flag=true;
            return false;
        }
        console.log('true')
        return true;
    }


    uploadAvatar = (obj) => {
        const form = new FormData();
        form.append('name', obj.filename)
        form.append('file', obj.file)

        const avatarUrl = URL.createObjectURL(obj.file);
        this.setState({ loading: true })

        fetch(obj.action, { method: 'POST', body: form })
            .then(res => {
                if (this._isMounted) {
                    if (res.status === 200 || res.status === 201) {
                        message.success('上传成功！')
                        this.setState({ avatarUrl })
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
    // uploadPic = (obj) => {
    //     const form = new FormData();
    //     form.append('name', obj.filename)
    //     form.append('file', obj.file)

    //     const file = obj.file, fileList = this.state.fileList;
    //     const newFileList = fileList.slice()
    //     file.status = 'uploading';
    //     newFileList.push(file)
    //     if (this._isMounted) {
    //         this.setState({ fileList: newFileList })
    //     }

    //     fetch(obj.action, { method: 'POST', body: form })
    //         .then(res => {
    //             if (res.status === 200 || res.status === 201) {
    //                 file.status = 'done'
    //                 //file.thrumbUrl='';
    //                 const fileList = this.state.fileList;
    //                 const newFileList = fileList.slice()
    //                 if (this._isMounted) {
    //                     this.setState({ fileList: newFileList })
    //                 }
    //             } else {
    //                 file.status = 'error'
    //                 //file.thrmbUrl='';
    //                 const fileList = this.state.fileList;
    //                 const newFileList = fileList.filter((item, index) => {
    //                     if (item.status === 'error') {
    //                         return false;
    //                     }
    //                     return true;
    //                 })
    //                 if (this._isMounted) {
    //                     this.setState({ fileList: newFileList })
    //                 }
    //             }
    //         }).catch(e => {
    //             file.status = 'error'
    //             //file.thrmbUrl='';
    //             const fileList = this.state.fileList;
    //             const newFileList = fileList.slice()
                
    //             // const newFileList = fileList.filter((item, index) => {
    //             //     if (item.status === 'error') {
    //             //         return false;
    //             //     }
    //             //     return true;
    //             // })
    //             if (this._isMounted) {
    //                 this.setState({ fileList: newFileList })
    //             }
    //         })
    // }
    handleChange = ({ fileList,file }) => {
        if(file.flag){
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
    render() {
        const { comments, collections, avatarUrl, loading, previewVisible, previewImage, fileList } = this.state;
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
        const uploadButton = (
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
                <Col span={14}>
                    <Tabs>
                        <TabPane key='1' tab='我的评论列表'>
                            {commentList}
                        </TabPane>
                        <TabPane key='2' tab='我的收藏列表'>
                            {collectionList}
                        </TabPane>
                        <TabPane key='3' tab='我的个人资料'>
                            <div>
                                <Avatar class='avatar-container' size='large' icon='user' src={avatarUrl} />
                                <Upload
                                    class='upload-container'
                                    name='avatar'
                                    listType='picture-card'
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    beforeUpload={this.beforeUpload}
                                    customRequest={this.uploadAvatar}
                                >
                                    {uploadButton}
                                </Upload>
                            </div>
                            <div>
                                <Upload
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
                    </Tabs>
                </Col>
                <Col span={4} />
            </Row>
        )
    }
}