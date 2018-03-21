/**
 * Created by CQ on 2017/8/1.
 */
var Table = React.createClass({
    getInitialState: function () {
        return {
            data: this.props.data
        }
    },
    componentDidMount: function () {
        var $this=this;
        this.pubsub_token = PubSub.subscribe('Change_Page', function (topic, product) {
            fetch('/React/api/some'+product+'.json')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response
                        response.json().then(function (data) {
                            $this.setState({
                                data: data
                            })
                        });
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });

        }.bind(this));
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token);
    },
    render: function () {
        var lists=[];
        var data=this.state.data;
        data.map(function(index,item){
           lists.push(<TableCell key={item} index={item} data={index}/>)
        });
        return <table>
            <thead>
           <tr>
               <th>序号</th>
               <th>名称</th>
               <th>服务</th>
               <th>漏洞</th>
               <th>类型</th>
               <th>端口</th>
           </tr>
            </thead>
           <tbody>{lists}</tbody>
        </table>
    }
});

var TableCell=React.createClass({
    render: function () {
        return <tr>
            <td>{this.props.index}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.service}</td>
            <td>{this.props.data.vul}</td>
            <td>{this.props.data.type}</td>
            <td>{this.props.data.port}</td>
        </tr>
    }
});

var Page = React.createClass({
    getInitialState: function () {
        return {current: 1, value: ''};
    },
    componentDidMount: function () {

    },
    handClick: function (e) {
        let sel = this;
        return function () {
            sel.setState({current: e});
            PubSub.publish("Change_Page",e);
        }
    },
    handChange: function (e) {
        this.setState({value: e.target.value})

    },
    goNext: function () {
        let cur = this.state.current;
        if (cur < this.props.total) {
            this.setState({current: cur + 1});
            PubSub.publish("Change_Page", cur + 1);
        }

    },
    goPrev: function () {
        let cur = this.state.current;
        if (cur > 1) {
            this.setState({current: cur - 1});
            PubSub.publish("Change_Page",cur - 1);
        }


    },
    goPage: function () {
        var val = this.state.value;
        if (!/^[1-9]\d*$/.test(val)) {
            alert('页码只能输入大于1的正整数');
        } else if (parseInt(val) > parseInt(this.props.total)) {
            alert('没有这么多页');
        } else {
            this.setState({current: val});
            PubSub.publish("Change_Page",val);
        }
    },
    render: function () {
        let self = this;
        let total = this.props.total;
        let cur = this.state.current;
        let items = [];
        let begin;
        let len;
        if (total > 5) {
            len = 5;
            if (cur >= (total - 2)) {
                begin = total - 4;
            } else if (cur <= 3) {
                begin = 1;
            } else {
                begin = cur - 2;
            }
        } else {
            len = total;
            begin = 1;
        }
        for (let i = 0; i < len; i++) {
            let cur = this.state.current;
            let showI = begin + i;
            if (cur == showI) {
                items.push({num: showI, cur: true});
            } else {
                items.push({num: showI, cur: false});
            }

        }
        return <div className="ui-pagnation">
            <a className={this.state.current == 1? 'prev disable' : 'prev'} onClick={this.goPrev}></a>
            <span className="pagnation-cols">
                    {
                        items.map(function (item) {
                            return <a key={item.num} onClick={self.handClick(item.num)}
                                      className={item.cur? 'num current' : 'num'}>{item.num}</a>
                        })
                    }
            </span>
            <a className={this.state.current == this.props.total? 'next disable' : 'next'} onClick={this.goNext}></a>
            <div className="fl">
                共
                <span className="num-total">{total}</span>
                页，到第
                <input type="text" value={self.state.value} onChange={this.handChange}/>
                页
            </div>
            <a onClick={this.goPage} className="page-go">确定</a>
        </div>
    }
});

var Demo = React.createClass({
    render: function () {
        return <div>
            <Table data={this.props.data}/>
            <Page total={this.props.total}></Page>
        </div>
    }
});

var Data={
    getData:function(page){
        var dataAll=[];


    },
    init: function () {
        fetch('/React/api/some.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        ReactDOM.render(
                            <Demo total={data.total} data={data.data}/>,
                            document.getElementById('demo')
                        );
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
}


Data.init();
