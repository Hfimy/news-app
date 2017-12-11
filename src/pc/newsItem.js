import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


export default class Detail extends PureComponent {
    static propTypes = {

    }
    static defaultProps = {

    }
    state = {
        newsItem: ''
    }

    componentWillMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ newsItem: response }, () => {
                    document.title = this.state.newsItem.title
                })
            })
    }
    componentWillUpdate() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ newsItem: response }, () => {
                    document.title = this.state.newsItem.title
                })
            })
    }
    render() {
        const { newsItem } = this.state;
        return (
            <div class='news-detail' dangerouslySetInnerHTML={{ __html: newsItem.pagecontent }}></div>
        )
    }
}