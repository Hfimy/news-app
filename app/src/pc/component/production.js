import React, { PureComponent } from 'react'

export default class Product extends PureComponent {
    render() {
        return (
            <div className="fr cpc" id="rmw_cpc">
                <h2><a href="http://cpc.people.com.cn/" target="_blank">中国共产党新闻网</a></h2>
                <ul className="list14">
                    <li><b><a href="http://cpc.people.com.cn/xuexi/" target="_blank">学习</a></b><span className="xian">|</span><a href="http://cpc.people.com.cn/n1/2017/1213/c164113-29703602.html" target="_blank">习近平十九大后首次离京考察看点</a></li>
                    <li><a href="http://theory.people.com.cn/n1/2017/1213/c40531-29702582.html" target="_blank"><b><font color="#000000">为实现中国梦奋斗正是对先烈的最好告慰</font></b></a></li>
                    <li><a href="http://fanfu.people.com.cn/n1/2017/1212/c64371-29702051.html" target="_blank">图解:中纪委揪出"四风"问题十余类新表现</a></li>
                    <li><a href="http://cpc.people.com.cn/n1/2017/1213/c415067-29702599.html" target="_blank">以钉钉子精神推进国企改革任务落地见效</a></li>
                    <li><a href="http://renshi.people.com.cn/n1/2017/1213/c139617-29704555.html" target="_blank">王昌荣任浙江省委常委、政法委书记(简历)</a></li>
                    <li><a href="http://renshi.people.com.cn/n1/2017/1213/c139617-29702976.html" target="_blank">李晓鹏任中国光大集团党委书记(图/简历)</a></li>
                    <li><a href="http://fanfu.people.com.cn/n1/2017/1212/c64371-29701654.html" target="_blank">河北省人大常委会副主任张杰辉接受审查</a></li>
                    <li><b><a href="http://renshi.people.com.cn/" target="_blank">人事</a></b><span className="xian">|</span><a href="http://renshi.people.com.cn/n1/2017/1213/c139617-29703202.html" target="_blank">袁家健当选天津市红桥区区长(简历)</a></li>
                    <li><a href="http://renshi.people.com.cn/n1/2017/1213/c139617-29703613.html" target="_blank">乔登州任山西省运城市委常委、市委秘书长</a></li>
                    <li><b><a href="http://fanfu.people.com.cn/" target="_blank">反腐</a></b><span className="xian">|</span><a href="http://fanfu.people.com.cn/n1/2017/1213/c64371-29703034.html" target="_blank">安徽宁国原副市长胡琳娟(女)忏悔录</a></li>
                    <li><a href="http://fanfu.people.com.cn/n1/2017/1213/c64371-29702936.html" target="_blank">吉林省四平市委原书记王克成接受组织审查</a></li><li><a href="http://theory.people.com.cn/n1/2017/1213/c40531-29703221.html" target="_blank"><b><font color="#000000">构建人类命运共同体是中国共产党的使命</font></b></a></li>
                    <li><b><a href="http://theory.people.com.cn/" target="_blank">观察</a></b><span className="xian">|</span><a href="http://theory.people.com.cn/n1/2017/1213/c40531-29703566.html" target="_blank">马克思主义中国化的又一历史性飞跃</a></li>
                    <li><a href="http://theory.people.com.cn/n1/2017/1213/c40531-29703047.html" target="_blank">中国特色社会主义进入新时代的重大意义</a></li><li><b><a href="http://dangshi.people.com.cn/" target="_blank">党史</a></b><span className="xian">|</span><a href="http://dangshi.people.com.cn/n1/2017/1211/c85037-29699186.html" target="_blank">"南京大屠杀"是中外公认战争暴行</a></li>
                    <li><a href="http://dangshi.people.com.cn/n1/2017/1213/c85037-29703057.html" target="_blank">游击战争“十六字诀”的形成与发展</a></li>
                </ul >
                <div className="cpc_zt clearfix">
                    <a href="http://jhsjk.people.cn/" target="_blank"><img src={`${require('../../../public/image/p5.jpg')}`} width={80} height={80} border={0} /></a>
                    <a href="http://cpc.people.com.cn/GB/67481/415067/index.html" target="_blank">学习贯彻十九大精神</a>|
                    <a href="http://dangjian.people.com.cn/n1/2017/1129/c117092-29673930.html" target="_blank">主题征文</a><br />
                    <a href="http://dangjian.people.com.cn/GB/136058/415189/index.html" target="_blank">十九大报告学习问答</a>|
                    <a href="http://theory.people.com.cn/GB/40557/407775/408045/index.html" target="_blank">理上网来</a><br />
                    <a href="http://dangjian.people.com.cn/GB/414209/index.html" target="_blank">党课随身听</a>|
                    <a href="http://dangjian.people.com.cn/GB/136058/414145/index.html" target="_blank">党支部的故事征文</a><br />
                </div>
            </div >

        )
    }
}