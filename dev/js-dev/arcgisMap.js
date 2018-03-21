console.log("------------init---------------")
require([
    "react",
    "react-dom",
    "dojo/_base/lang",
    "esri/Map",
    "esri/views/MapView",
    "esri/core/watchUtils",
    "esri/widgets/Zoom/ZoomViewModel",
    "dojo/domReady!"
], function (React, ReactDOM,
             lang,
             Map, MapView, watchUtils, ZoomViewModel) {
    console.log("进入-=-----------------------");
    var hitch = lang.hitch;
    var map = new Map({
        basemap: "topo"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-100.33, 25.69],
        zoom: 10,
        ui: {
            components: ["attribution"] // empty the UI, except for attribution
        }
    });
    console.log(view);
    var Zoom = React.createClass({
        getInitialState: function () {
            return {
                vm: new ZoomViewModel(),
                maxZoomed: false,
                minZoomed: false
            };
        },

        getDefaultProps: function () {
            return {
                view: {}
            }
        },

        componentDidMount: function () {
            this.props.view.then(hitch(this, "onViewLoaded"));
        },

        onViewLoaded: function (view) {
            this.state.vm.view = view;
            watchUtils.init(view, 'zoom', hitch(this, "onZoomChange"));
        },

        onZoomChange: function (value) {
            this.setState({
                maxZoomed: value === view.constraints.maxZoom,
                minZoomed: value === view.constraints.minZoom
            });
        },

        zoomIn: function () {
            if (!this.state.maxZoomed) {
                this.state.vm.zoomIn();
            }
        },

        zoomOut: function () {
            if (!this.state.minZoomed) {
                this.state.vm.zoomOut();
            }
        },

        render: function () {
            var maxstate = this.state.maxZoomed ? 'button circle raised disable' : 'button circle raised';
            var minstate = this.state.minZoomed ? 'button circle raised disable' : 'button circle raised';
            return (
                <div className="zoom-btns">
                    <div className={maxstate} onClick={this.zoomIn}>
                        <div className="center"><i className="material-icons">add</i></div>
                    </div>
                    <div className={minstate} onClick={this.zoomOut}>
                        <div className="center"><i className="material-icons">remove</i></div>
                    </div>
                </div>
            );
        }

    });
    var node = document.createElement("div");
    view.ui.add(node, "bottom-left");
    ReactDOM.render(
        <Zoom view={view}/>,
        node
    );
    console.log(node);
});


