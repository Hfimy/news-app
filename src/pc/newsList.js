import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Card, message } from 'antd'

export default class NewsList extends PureComponent {

    static propTypes = {
        type: PropTypes.string,
        count: PropTypes.number,
    }
    static defaultProps = {
        type: 'top',
        count: 20
    }

    state = {
        newsList: [],
    }

    componentWillMount() {
        this._isMounted = true;
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                if (this._isMounted) {
                    this.setState({ newsList: res })
                }
            }).catch(e => message.error('请求出错了'))
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { newsList } = this.state;
        const news = newsList.length
            ? newsList.map((item, index) =>
                <li key={index}><Link to={`/detail/${item.uniquekey}`}>{item.title}</Link></li>
            )
            : '正在加载中';
        return (
            <Card>
                <ul>
                    {news}
                </ul>
            </Card>
        )
    }


}