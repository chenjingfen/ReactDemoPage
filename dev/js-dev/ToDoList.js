/**
 * Created by CQ on 2017/7/13.
 */

var Title = React.createClass({
    getInitialState: function () {
        return {
            tmp: ''
        }
    },
    onChange: function (e) {
        this.setState({
            tmp: e.target.value
        });
    },
    onKeyUp: function (e) {
        if (e.keyCode === 13) {
            this.handler();
            this.refs.text.value = "";
            this.setState({
                tmp: ""
            });
        }
    },
    handler: function () {
        if(this.state.tmp!=""){
        PubSub.publish("add_Item", this.state.tmp);}

    },
    componentDidMount() {
        window.addEventListener('keyup', this.onKeyUp)
    },
    render: function () {
        return (<div className="row" style={{paddingTop:'1rem'}}>
            <span className="col-md-offset-3 col-md-2" style={{fontSize:'3rem'}}>ToDoList</span>
            <div className="col-md-3">
                <input ref="text" type="text" placeholder="添加TODO" className="form-control"
                       onChange={this.onChange}/></div>
        </div>);
    }
});

var Content = React.createClass({
    getInitialState: function () {
        return {
            going: 0,
            complete: 0,
            goList: [],
            comList: []
        };
    },
    componentWillMount: function () {
        var $this = this;
        this.pubsub_token = PubSub.subscribe('add_Item', function (topic, item) {
            var goList = this.state.goList;
            var going = this.state.going + 1;

            var itemInfo = {
                className: "going col-md-1",
                value: item
            }
            goList.push(<Item value={item} key={"add"+going} item={itemInfo}/>);
            $this.setState({
                goList: goList,
                going: going
            })

        }.bind(this));


        this.pubsub_token = PubSub.subscribe('click_Item', function (topic, item) {
            var goList = this.state.goList;
            var comList = this.state.comList;
            var going = this.state.going;
            var complete = this.state.complete;

            if (item.className === 'going') {

                goList.forEach(function(goItem,index){
                    if(goItem.props.value===item.value){
                        var itemInfo=goList.splice(index, 1)
                        var info = {
                            className: "complete col-md-1",
                            value: item.value
                        }
                        comList.push(<Item value={item.value} key={itemInfo[0].key} item={info}/>);
                        complete = complete + 1;
                        going=going-1;
                    }
                });
            } else {
                comList.forEach(function(comItem,index){
                    if(comItem.props.value===item.value){
                        var itemInfo= comList.splice(index, 1)

                        var info = {
                            className: "going col-md-1",
                            value: item.value
                        }
                        goList.push(<Item value={item.value} key={itemInfo[0].key} item={info}/>);
                        going = going + 1;
                        complete = complete - 1;
                    }
                });
            }

            $this.setState({
                goList: goList,
                going: going,
                comList: comList,
                complete:complete
            })

        }.bind(this));


        this.pubsub_token = PubSub.subscribe('sub_Item', function (topic, item) {
            var goList = this.state.goList;
            var comList = this.state.comList;
            var going = this.state.going;
            var complete = this.state.complete;

            console.log("---------sub_item------------");
            console.log(item);

            if (item.className.indexOf('going')!=-1 ) {

                goList.forEach(function(goItem,index){
                    console.log("--------going-----------")
                    console.log(goItem)
                    if(goItem.props.value===item.value){
                        goList.splice(index, 1);
                        going = going - 1;
                    }
                });
            } else {
                comList.forEach(function(comItem,index){
                    console.log("--------comList-----------")
                    console.log(index);
                    console.log(comItem)
                    if(comItem.props.value===item.value){
                        comList.splice(index, 1)
                        complete=complete-1;

                    }
                });
            }

            $this.setState({
                goList: goList,
                going: going,
                comList: comList,
                complete:complete
            })

        }.bind(this));
    },
    render: function () {
        var goList = this.state.goList;


        var comList = this.state.comList;
        return (<div className="row">
                <div className="row">
                    <span className="col-md-offset-3 col-md-5">正在进行</span>

                    <span className="col-md-1">{this.state.going}</span></div>
                <div className="row"> {goList}</div>
                <div className="row">
                    <span className="col-md-offset-3 col-md-5">已经完成</span>

                    <span className="col-md-1">{this.state.complete}</span>
                </div>
                <div className="row"> {comList}</div>

            </div>
        );
    }
});


var Item = React.createClass({

    getInitialState: function () {
        return {
            index: 0,
        };
    },
    removeMySelf: function (e) {
        console.log("--------------removeMySelf------------");
        console.log(e);
        var subItem=e.target.previousSibling;
        var myself={
            value:subItem.innerHTML,
            className:subItem.previousSibling.className
        }

        PubSub.publish("sub_Item", myself);
    },
    componentWillMount: function () {
        var index = this.state.index + 1;
        this.setState({
            index: index
        });
    },
    onClick: function (e) {
        var clickItem = {
            className: e.target.className,
            value: this.props.item.value
        }
        PubSub.publish("click_Item", clickItem);
    },
    render: function () {
        var props = this.props.item;
        var className = 'going col-md-offset-3 col-md-5';
        if (props.checked) {
            className = 'completed col-md-offset-3 col-md-5';
        }

        var itemDiv = <div className={className}>
            <input className={props.className} type="checkbox" onClick={this.onClick}/>
            <label className="col-md-5">{props.value}</label>
            <span className="col-md-1" onClick={this.removeMySelf}>-</span>
        </div>;
        return (itemDiv);
    }
});

var ToDoList = React.createClass({
    getInitialState: function () {
        console.log("getInitialState");
        return {
            count: 0
        }
    },
    getDefaultProps: function () {
        console.log("getDefaultProps");
    },
    componentWillMount: function () {
        console.log("componentWillMount")
    },
    componentDidMount: function () {
        console.log("componentDidMount");
    },
    componentWillUnmount: function () {
        alert("componentWillUnmount");
    },
    shouldComponentUpdate: function (nextProp, nextState) {
        console.log("shouldComponentUpdate");
        /* if(nextState.count>3){
         return false;
         }*/
        return true;
    },
    componentWillUpdate: function (nextProp, nextState) {
        console.log("componentWillUpdate");
    },
    componentDidUpdate: function () {
        console.log("componentDidUpdate");
    },
    killMySelf: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    },
    doUpdate: function () {
        this.setState({count: this.state.count + 1});
    },
    render: function () {
        console.log("渲染")
        return (<div>
            <Title/>
            <Content/>
        </div>);
    }
});


ReactDOM.render(<ToDoList/>, document.getElementById('app'), function () {
    console.log("完成了！");
})