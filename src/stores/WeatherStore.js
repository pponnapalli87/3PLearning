var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var _cities = [];
var WeatherStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
      },
    
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    getWeather: function() {
        return _cities;
    },
    setWeather: function(obj) {
        _cities.push(obj);
    },
    clear: function() {
        _cities = [];
    }
});

AppDispatcher.register(function(o) {
    switch(o.action) {
        case Constants.GET_WEATHER:
            WeatherStore.setWeather(o);
            WeatherStore.emitChange();
            break;
    }
});

module.exports = WeatherStore;
