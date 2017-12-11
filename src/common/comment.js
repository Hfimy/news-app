import React, { PureComponent } from 'react'

import { Form, Input, Button } from 'antd'
const FormItem = Form.Item;

class Comment extends PureComponent {


    static propTypes = {}
    static defaultProps = {}
    state = {

    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        const {getFieldDecorator} =this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label='请输入您的评论'>
                        {getFieldDecorator('comment', {
                            rules: [],
                        })(
                            <Input type='textarea' placeholder='随便写...' />
                            )}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                </Form>
            </div>
        )
    }
}

export default Form.create({})(Comment)