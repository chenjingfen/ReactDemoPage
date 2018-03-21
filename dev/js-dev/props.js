/**
 * Created by CQ on 2017/7/13.
 */
var MessageBox=React.createClass({
    getInitialState:function(){
        return {
            isVisible:true,
            titleMessage:'你好世界（来自state）',
            subMessage:[
                '我会搬砖',
                '以及花式搬砖',
                '不说了，工头叫我去办桌。。。。。'
            ]
        }
    },
    render:function(){
        return (<div>
            <h1>{this.props.title}</h1>
            <Submessage key={this.state.titleMessage} message={this.state.subMessage}/>
        </div>);
    }
});

var Submessage=React.createClass({
    propTypes:{
        message:React.PropTypes.array.isRequired
    },
    //设置默认的message,若Submessage组件没有传递参数message，
    // 则显示该默认参数
    getDefaultProps:function(){
        return {
            message:['默认的子消息']
        }
    },
    render:function(){
        var msg=[];
        this.props.message.forEach(function(mess,index){
            msg.push(
                <p key={index}>码农说:{mess}</p>
            );
        });
        return(<h1>{msg}</h1>)
    }
});


var title='标题1（来自props）'
var messageBox=ReactDOM.render(<MessageBox title={title}/>,document.getElementById('app'),function(){
    console.log("完成了！");
})