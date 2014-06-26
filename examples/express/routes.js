var gtfs = require('../../');
var url = require('url');
var _ = require('underscore');

module.exports = function routes(app){
  
  //AgencyList
  app.get('/api/agencies', function(req, res){
    gtfs.agencies(function(e, agencies){
      res.send( _.map(agencies, function(agency) { 
        return {
          name: agency.agency_name,
          key: agency.agency_key,
          timezone: agency.agency_timezone,
          url: agency.agency_url
        };
      }) || {error: 'No agencies in database'});
    });
  });
   
  //Routelist
  app.get('/api/routes/:agency', function(req, res){
    var agency_key = req.params.agency;
    gtfs.getRoutesByAgency(agency_key, function(e, routes){
      res.send( _.map(routes, function(route) { 
        return { 
          id: route.route_id,
          agency: route.agency_key,
          short_name: route.route_short_name,
          long_name: route.route_long_name,
          description: route.route_desc,
          type: route.route_type
        };
      }) || {error: 'No routes for agency_key ' + agency_key});
    });
  });
 
  app.get('/api/calendar', function(req, res) { 
   
    gtfs.calendars(function(e, calendars) {
      res.send(_.map(calendars, function(calendar) { 
        return { 
          id: calendar.service_id,
          start_date: calendar.start_date,
          end_date: calendar.end_date,
          monday: calendar.monday == 1,
          tuesday: calendar.tuesday == 1,
          wednesday: calendar.wednesday == 1,
          thursday: calendar.thursday == 1,
          friday: calendar.friday == 1,
          saturday: calendar.saturday == 1,
          sunday: calendar.sunday == 1
        };
      }));
    });
  });

  app.get('/api/planned_trips', function(req, res) {
    var params = url.parse(req.url, true).query;

    if (!params.departure_stop_id ||
        !params.destination_stop_id ||
        !params.departure_date_time) {
      res.send(404, "Parameters departure_stop_id, destination_stop_id, and departure_date_time are required.");
    } else { 
      res.send(_.map(gtfs.findPlannedTrip(params.departure_stop_id, 
                                          params.destination_stop_id, 
                                          params.departure_date_time), function(plannedTrip) { 
        return {
          departure_stop: "1",
          departure_date_time: "2",
          arrival_stop: "3",
          arrival_date_time: "4"
        };
      }));
    }
  });    

  app.get('/api/stops', function(req, res) { 
    gtfs.findStops(function(e, stops) { 

      res.send(_.map(stops, function(stop) {       
        return {
          id: stop.stop_id,
          name: stop.stop_name,
          description: stop.stop_desc,
          latitude: stop.stop_lat,
          longitude: stop.stop_lon
        };
      }));
    });
  });

  app.get('/api/trips', function(req, res) {
    var params = url.parse(req.url, true).query;

    if (!params.route_id || !params.calendar_id) { 
      res.send(404, "Parameters route_id and calendar_id are required.");
    } else { 
      gtfs.findTrip(params.route_id, params.calendar_id, function(e, trips) { 
        res.send(_.map(trips, function(trip) { 
          return { 
            id: trip.trip_id,
            route: trip.route_id,
            direction: trip.direction_id,
            calendar: trip.service_id
          };
        }));
      });
    }
  });

}
