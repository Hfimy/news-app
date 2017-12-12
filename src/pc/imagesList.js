import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import '../../public//style/pc_imagesList.less'

export default class ImagesList extends Component {

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
        imagesList: [],
    }

    componentWillMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.shouldUpdate = false;
                this.setState({ imagesList: response })
            })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.type) {
            if (nextProps.type !== this.props.type) {
                this.shouldUpdate = true;
            }
        }
        return true;
    }
    componentDidUpdate() {
        if (this.shouldUpdate) {
            fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, { method: 'GET' })
                .then(response => response.json())
                .then(response => {
                    this.shouldUpdate = false;
                    console.log(response)
                    this.setState({ imagesList: response })
                })
        }
    }
    render() {
        const { imagesList } = this.state;
        const images = imagesList.length
            ? imagesList.map((item, index) => (
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