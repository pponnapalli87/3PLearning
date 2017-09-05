var Dispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var WeatherApi = require('../api/WeatherApi');


var WeatherActions = {
    getWeatherDetails: function(cities) {
        WeatherApi.get(cities)
            .then(function(response) {
                Dispatcher.dispatch({
                    action: Constants.GET_WEATHER,
                    data: response
                });
            });
    }
};
module.exports = WeatherActions;