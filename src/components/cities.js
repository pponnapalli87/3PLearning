"use strict";

var React = require('react');
var $ = require("jquery");

var Cities = React.createClass({
    render: function() {
        var createCityRow = function(city) {
			return (
				<tr key={city.data.id}>
                    <td>{city.data.name}</td>
					<td>{(city.data.main['temp'] - 273.15).toFixed(0)}</td>
					<td>{city.data.weather[0]['main']}</td>
				</tr>
			);
        };
        var populateCities = function(cities) {
            if(Array.isArray(cities)) {
                 return cities.map(createCityRow, this);
            }
            else {
                return createCityRow(cities);
            }
        };
        return (
			<div>
				{this.props.cities && this.props.cities.length > 0 && <table>
					<thead>                        
                        <tr>
                            <th>City</th>
                            <th>C</th>
                            <th>Condition</th>
                        </tr>                   
					</thead>

					<tbody>
                        {this.props.cities ? populateCities(this.props.cities) : []}                        
                    </tbody>
				</table>}
			</div>
		);
    }
});

module.exports = Cities;