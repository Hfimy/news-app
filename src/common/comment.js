import React, { PureComponent } from 'react'

import { Form, Input, Button } from 'antd'
const FormItem = Form.Item;
const {TextArea}=Input;

class Comment extends PureComponent {


    static propTypes = {}
    static defaultProps = {}
    state = {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( (err, values) => {
            if (!err) {
                console.log(values)
                this.props.form.resetFields();
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label='请输入您的评论'>
                        {getFieldDecorator('comment', {
                            rules: [{ required: true, message: '不能提交空的评论哦~' }],
                        })(
                            <TextArea autosize={{minRows:4,maxRows:10}} placeholder='随便写...' />
                            )}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                </Form>
            </div>
        )
    }
}

export default Form.create({})(Comment)