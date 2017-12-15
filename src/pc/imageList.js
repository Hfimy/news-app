import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Card, message } from 'antd'
import { handleResponse } from '../common/util'

import '../../public//style/pc_imageList.less'

export default class ImageList extends PureComponent {

    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cardTitle: PropTypes.string.isRequired,
        cardWidth: PropTypes.string,
        imgWidth: PropTypes.string,
    }
    static defaultProps = {
        cardWidth: '100%',
        imgWidth: '125px',
    }

    state = {
        imageList: [],
    }

    componentWillMount() {
        this._isMounted = true;
        this.updateImage(this.props.type, this.props.count)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type) {
            if (nextProps.type !== this.props.type) {
                this.updateImage(nextProps.type, nextProps.count)
            }
        }
    }
    updateImage = (type, count) => {

        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`, { method: 'GET' })
            .then(handleResponse)
            .then(res => {
                if (this._isMounted) {
                    this.setState({ imageList: res })
                }
            }).catch(e => message.error('请求出错了'))
    }
    render() {
        const { imageList } = this.state;
        const images = imageList.length
            ? imageList.map((item, index) => (
                <li key={index}>
                    <Link to={`/detail/${item.uniquekey}`}>
                        <img width={this.props.imgWidth} src={item.thumbnail_pic_s} alt={item.title} />
                        <h3 title={item.title}>{item.title}</h3>
                        <p>{item.author_name}</p>
                    </Link>
                </li>
            ))
            : '正在加载中';
        return (
            <Card title={this.props.cardTitle} class='image-card' style={{ width: this.props.cardWidth }}>
                <ul>
                    {images}
                </ul>
            </Card>
        )
    }
}