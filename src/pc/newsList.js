import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Card } from 'antd'

export default class NewsList extends PureComponent {

    static propTypes = {
        type: PropTypes.string,
        count: PropTypes.number,
    }
    static defaultProps = {
        type: 'top',
        count: 22
    }

    state = {
        newsList: [],
    }

    componentWillMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ newsList: response })
            })
    }

    render() {
        const { newsList } = this.state;
        const news = newsList.length
            ? newsList.map((item, index) =>
                <li key={index}><Link to='/'>{item.title}</Link></li>
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