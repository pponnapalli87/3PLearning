"use strict";
var $ = require("jquery");
var WeatherStore = require('../stores/WeatherStore');
var WeatherActions = require('../actions/GetWeatherAction');

var React = require('react');
var Cities = require('./cities');

var Weather = React.createClass({
    getInitialState: function() {
        return {
            cities: [],
            search: null
        };
    },
    getAppState: function() {
        return {
          cities: WeatherStore.getWeather(),
          search: this.state.search
        };
    },
    componentWillMount: function() {
        this.getInitialState();
    },
    componentDidMount: function() {
        WeatherStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        WeatherStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this.getAppState());
    },
    handleSearch: function(e) {
        this.setState({search: e.target.value});
    },
    invokeApi: function() {
        WeatherStore.clear();
        if(this.state.search) {
            var temp = this.state.search.split(',');
            temp.forEach(function(element) {
                WeatherActions.getWeatherDetails(element);
            }, this);
        }
        else {
            this._onChange();
        }      
    },
    render: function() {
        return (
        <div className="container"> 
              <div className="weatherForm">
                  <div>                                   
                <label htmlFor="cities">Cities</label>
                <input type="text"
                id="cities"
                name={"Sydney"}
                placeholder={"Enter comma separated cities"}
                ref={this.props.name}
                defaultValue = {this.state.search}
                onChange={this.handleSearch} />
                </div>
                <input type="submit" value="Submit" onClick={this.invokeApi} />
                </div>
                
                <Cities cities={this.state.cities || []} />
        </div>
        );
    }
});

module.exports = Weather;