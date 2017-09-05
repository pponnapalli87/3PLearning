jest.autoMockOff();

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Weather = require('../weather');
var WeatherStore = require('../../stores/WeatherStore');
var Api = require('../../api/WeatherApi');

describe('weather', function() {

    var
        search,
        cities,
        onClick,
        container;
    function render() {
        return ReactDOM.render(
            <Weather
                search={search}
                cities={cities}
                onClick={onClick} />,
            container
        );
    }

    beforeEach(function() {
        cities = {
            "coord":{"lon":151.21,"lat":-33.87},
            "weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],
            "base":"stations",
            "main":{"temp":281.02,"pressure":1014,"humidity":76,"temp_min":278.15,"temp_max":284.15},
            "visibility":9000,
            "wind":{"speed":3.1,"deg":320},
            "clouds":{"all":12},
            "dt":1504377780,
            "sys":{"type":1,"id":8233,"message":0.0059,"country":"AU","sunrise":1504296689,"sunset":1504337899},
            "id":2147714,
            "name":"Sydney",
            "cod":200
            };
        search = ['Sydney'];

        container = document.createElement('div');
    });

    afterEach(function() {
        ReactDOM.unmountComponentAtNode(container);
    });
    it ('should render the weather component', function() {        
        var weather = render();
        var node = TestUtils.findRenderedDOMComponentWithClass(weather, 'container');
        expect(node.childNodes.length).toEqual(2);
    });

    it ('should clear cities data when we invoke clear() from the store', function() {      
        WeatherStore.setWeather(cities);
        WeatherStore.clear();
        expect(WeatherStore.getWeather()).toEqual([]);
        
    });

    it ('should return cities data when we invoke getWeather() from store', function() {        
        WeatherStore.setWeather(cities);       
        expect(WeatherStore.getWeather()).toEqual([cities]);        
    });
});