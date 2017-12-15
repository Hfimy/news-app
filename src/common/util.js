
export function handleResponse(res) {
    if (res.ok) {
        // console.log('请求返回ok')
        //即意味着响应状态码为2xx,3xx

        return handleContentTypeResponse(res)
    }
    // console.log('请求返回false')
    return Promise.reject({ status: res.status, statusText: res.statusText })
}

function handleContentTypeResponse(res) {
    // const contentType = res.headers.get('content-type');
    // console.log(contentType)
    // if (contentType.includes('application/json')) {
    //     // return handleJSONResponse(res)
    //     return res.json();
    // }
    // if (contentType.includes('text/')) {
    //     // return Object.assign({}, res.text(), { status: res.status, statusText: res.statusText })
    //     return res.text();
    // }
    // if (contentType.includes('image')) {
    //     return Object.assign({}, res.blob(), { status: res.status, statusText: res.statusText })
    // }
    // others type
    return res.json();
}
