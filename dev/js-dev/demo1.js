/**
 * Created by CQ on 2017/7/13.
 */
var MessageBox=React.createClass({
    getInitialState:function(){
        return {
            isVisible:true,
            titleMessage:'你好世界（来自state）',
        }
    },
    render:function(){
        var styleObj={
            display:this.state.isVisible?'block':'none',
        }
        return (<div>
           <h1 style={styleObj}>{this.state.titleMessage}</h1>
            <Submessage2/>

        </div>);
    }
});

var Submessage=React.createClass({
    render:function(){
        return(<h1>你好世界，我是第一个……</h1>)
    }
});

var Submessage2=React.createClass({
    render:function(){
        return(<h2>你好世界，我是第二个……</h2>)
    }
});

var messageBox=ReactDOM.render(<MessageBox/>,document.getElementById('app'),function(){
    console.log("完成了！");
})