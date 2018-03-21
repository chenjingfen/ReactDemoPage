/**
 * Created by CQ on 2017/7/13.
 */
var FormApp = React.createClass({
    getInitialState: function () {
        return {
            inputValue: "input Value",
            selectValue: "A",
            radioValue: "B",
            checkValue: [],
            textAreaValue: "some other...."
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();
        console.log("----------submit-----------")
        console.log(this.refs.goodInput.value);
        var form = {
            input: this.refs.goodInput.value,
            select: this.refs.goodSelect.value,
            textarea: this.refs.goodText.value,
            radio: this.state.radioValue,
            check: this.state.checkValue

        };
        console.log("表单内容：")
        console.log(form);
        this.refs.goodRadio.saySomthing();
    },
    handleRadio: function (e) {
        console.log(e);
        this.setState({
            radioValue: e.target.value
        })
    },
    handleCheck: function (e) {
        var checks = this.state.checkValue.slice();
        var item = e.target.value;
        var index = checks.indexOf(item);
        if (index == -1) {
            checks.push(item);
        } else {
            checks.splice(index, 1);
        }
        this.setState({
            checkValue: checks
        });
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input ref="goodInput" type="text" defaultValue="默认值"/>
                <br/>
                <select defaultValue="B" ref="goodSelect">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
                <br/>
                <RadioButtons ref="goodRadio" handleRadio={this.handleRadio}/>
                <br/>
                <CheckButtons handleCheck={this.handleCheck}/>
                <br/>
                <textarea ref="goodText" defaultValue="..........."></textarea>
                <br/>
                <button type="submit">提交</button>
            </form>
        );
    }

});

var RadioButtons = React.createClass({
    saySomthing:function(){
        alert("测试一下");
    },
    render: function () {
        return (
            <span>
                A
                <input onChange={this.props.handleRadio} name="select" type="radio" value="A"/>
                B<input onChange={this.props.handleRadio} name="select" type="radio" value="B"
                        defaultChecked="checked"/>
                C<input onChange={this.props.handleRadio} name="select" type="radio" value="C"/>
                D<input onChange={this.props.handleRadio} name="select" type="radio" value="D"/>

            </span>
        );
    }
});

var CheckButtons = React.createClass({

    render: function () {
        return (<span>
            A<input onChange={this.props.handleCheck} name="check" type="checkbox" value="A"/>
            B<input onChange={this.props.handleCheck} name="check" type="checkbox" value="B"/>
            C<input onChange={this.props.handleCheck} name="check" type="checkbox" value="C"/>
            D<input onChange={this.props.handleCheck} name="check" type="checkbox" value="D"/>
        </span>);
    }
});

ReactDOM.render(<FormApp/>, document.getElementById('app'), function () {
    console.log("完成了！");
})