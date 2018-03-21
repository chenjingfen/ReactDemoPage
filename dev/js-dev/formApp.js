/**
 * Created by CQ on 2017/7/13.
 */
var FormApp = React.createClass({
    getInitialState: function () {
        return {
            inputValue: "input Value",
            selectValue: "A",
            radioValue: "B",
            checkValue: "C",
            textAreaValue: "some other...."
        }
    },
    render: function () {
        return (
            <form>
                <input type="text" defaultValue="默认值"/>
                <br/>
                <select defaultValue="B">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
                <br/>
                <input name="select" type="radio" value="A"/>
                <input name="select" type="radio" value="B" defaultChecked="checked"/>
                <input name="select" type="radio" value="C"/>
                <input name="select" type="radio" value="D"/>
                <br/>
                <input name="select" type="checkbox" value="A"/>
                <input name="select" type="checkbox" value="B" defaultChecked="checked"/>
                <input name="select" type="checkbox" value="C"/>
                <input name="select" type="checkbox" value="D"/>
                <br/>
                <textarea defaultValue="..........."></textarea>
            </form>
        );
    }

});

ReactDOM.render(<FormApp/>, document.getElementById('app'), function () {
    console.log("完成了！");
})