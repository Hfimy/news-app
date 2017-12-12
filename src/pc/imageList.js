import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import '../../public//style/pc_imageList.less'

export default class ImageList extends Component {

    static propTypes = {
        type: PropTypes.string,
        count: PropTypes.number,
        cardTitle: PropTypes.string,
        cardWidth: PropTypes.string,
        imgWidth: PropTypes.string,
    }
    static defaultProps = {
        type: 'top',
        count: 10,
        cardTitle: '头条',
        cardWidth: '100%',
        imgWidth: '120px',
    }

    state = {
        imageList: [],
    }

    componentWillMount() {
        this.updateImage(this.props.type, this.props.count)
    }

    updateImage = (type, count) => {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ imageList: response })
            })
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.type) {
            if (nextProps.type !== this.props.type) {
                this.updateImage(nextProps.type, nextProps.count)
            }
        }
        return true;
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