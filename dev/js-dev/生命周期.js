/**
 * Created by CQ on 2017/7/13.
 */
var MessageBox=React.createClass({
    getInitialState:function(){
        console.log("getInitialState");
        return {
            count:0
        }
    },
    getDefaultProps:function(){
        console.log("getDefaultProps");
    },
    componentWillMount:function(){
        console.log("componentWillMount")
    },
    componentDidMount: function () {
        console.log("componentDidMount");
    },
    componentWillUnmount:function(){
        alert("componentWillUnmount");
    },
    shouldComponentUpdate: function (nextProp,nextState) {
        console.log("shouldComponentUpdate");
       /* if(nextState.count>3){
            return false;
        }*/
        return true;
    },
    componentWillUpdate:function(nextProp,nextState){
        console.log("componentWillUpdate");
    },
    componentDidUpdate: function () {
        console.log("componentDidUpdate");
    },
    killMySelf:function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    },
    doUpdate: function () {
        this.setState({count:this.state.count+1});
    },
    render:function(){
        console.log("渲染")
        return (<div>
            <h1>计数{this.state.count}</h1>
            <button onClick={this.killMySelf}>卸载这个组件</button>
            <button onClick={this.doUpdate}>手动更新一下</button>
            <SubMessage count={this.state.count}/>
              </div>);
    }
});

var SubMessage=React.createClass({
    componentWillReceiveProps: function (nextProp) {
        console.log("子组件将要获得prop");
    },
    shouldComponentUpdate:function(nextProp,nextState){
        if(nextProp.count>5){
            return false;
        }
        return true;
    },
    render: function () {
        return (
            <div>
                计数：+{this.props.count}
            </div>
        );
    }
});



var messageBox=ReactDOM.render(<MessageBox/>,document.getElementById('app'),function(){
    console.log("完成了！");
})