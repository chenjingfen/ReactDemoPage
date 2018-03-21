/**
 * Created by CQ on 2017/7/13.
 */
var ClickApp=React.createClass({
    getInitialState:function(){
        return{
            clickCount:0
        }
    },
    render:function(){
        return (<div>
            <button onClick={this.handleClick}>点击我</button>
            <label>你一共点击了{this.state.clickCount}次</label>
        </div>);
    },
    handleClick:function(){
        this.setState({clickCount:this.state.clickCount+1});
    }
});

var messageBox=ReactDOM.render(<ClickApp/>,document.getElementById('app'),function(){
    console.log("完成了！");
})