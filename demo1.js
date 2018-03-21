/**
 * Created by CQ on 2017/7/13.
 */
var MessageBox=React.createClass({displayName: "MessageBox",
    render:function(){
        return (React.createElement("h1", null, "你好世界！！！"));
    }
});

React.render(React.createElement(MessageBox, null),document.getElementById('app'),function(){
    console.log("完成了！");
})