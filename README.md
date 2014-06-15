#Node-GTFS

node-GTFS loads transit data in [GTFS format](https://developers.google.com/transit/) from [GTFS Data Exchange](http://www.gtfs-data-exchange.com/), unzips it and stores it to a MongoDB database and provides some methods to query for agencies, routes, stops and times. 
#Resources
##agency
Represents the business unit that operates this service.
###Fields
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| name | string | No | No | - |  |
| timezone | string | No | No | - |  |
| url | string | No | No | - |  |
###Operations
####/agency
####Parameters
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| limit | integer | No | No | 25 | The number of records to return |
| offset | integer | No | No | - | Used to paginate. First page of results is 0. |
####Responses
| Code | Result | 
|  ---  |  ---  | 
| 200 | [agency] |
##calendar
Represents different time frames that have different schedules.
###Fields
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| id | string | No | No | - | Text key uniquely identifying the time frame (SAt, SUN, WKDY, etc...). |
| start_date | date-time-iso8601 | No | No | - | When the calendar starts (inclusive). |
| end_date | date-time-iso8601 | No | No | - | When the calendar ends (exclusive). |
| monday | boolean | No | No | - |  |
| tuesday | boolean | No | No | - |  |
| wednesday | boolean | No | No | - |  |
| thursday | boolean | No | No | - |  |
| friday | boolean | No | No | - |  |
| saturday | boolean | No | No | - |  |
| sunday | boolean | No | No | - |  |
###Operations
####/calendar
####Parameters
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| limit | integer | No | No | 25 | The number of records to return |
| offset | integer | No | No | - | Used to paginate. First page of results is 0. |
####Responses
| Code | Result | 
|  ---  |  ---  | 
| 200 | [calendar] |

##route
The path a service takes.
###Fields
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| id | string | No | No | - |  |
| agency | agency | No | No | - |  |
| short_name | string | No | No | - |  |
| long_name | string | No | No | - |  |
| description | string | No | No | - |  |
| type | integer | No | No | - | 0 - tram/lightrail, 1 - subway, 2 - rail, 3 - bus, 4 - ferry, 5 - cable car, 6 - gondola, 7 - funicular |
###Operations
####/route
####Parameters
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| limit | integer | No | No | 25 | The number of records to return |
| offset | integer | No | No | - | Used to paginate. First page of results is 0. |
####Responses
| Code | Result | 
|  ---  |  ---  | 
| 200 | [route] |

##stop
Represnets a stop (you know, where you can like get of and like get on).
###Fields
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| id | string | No | No | - |  |
| name | string | No | No | - |  |
| description | string | No | No | - |  |
| latitude | double | No | No | - |  |
| longitude | double | No | No | - |  |
###Operations
####/stop
####Parameters
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| limit | integer | No | No | 25 | The number of records to return |
| offset | integer | No | No | - | Used to paginate. First page of results is 0. |
####Responses
| Code | Result | 
|  ---  |  ---  | 
| 200 | [stop] |

##stop_time
Represents a stop on a particular trip.
###Fields
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| trip | trip | No | No | - |  |
| arrival_time | date-time-iso8601 | No | No | - | The time that the vehicle arrives at the station. |
| departure_time | date-time-iso8601 | No | No | - | The time that the vehicle leaves the station.  Often the same as the arrival time indicating it's a quick stop. |
| stop | stop | No | No | - |  |
| sequence | integer | No | No | - | The order of the stop for this particular trip. |
###Operations
####/stop_time
####Parameters
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| trip_id | string | No | No | - | The id of the trip you are looking for stop times for. |
####Responses
| Code | Result | 
|  ---  |  ---  | 
| 200 | [stop_time] |

##trip
The path the vehicle takes stopping for people along the way (unless it's full of course.  Then it might just keep going.  You never know.)
###Fields
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| id | string | No | No | - |  |
| route | route | No | No | - |  |
| direction | integer | No | No | - | Sorta silly because it's make an assumption about where the 'center' is but: 1 - outbound, 2 - inbound |
| calendar | calendar | No | No | - |  |
###Operations
####/trip
####Parameters
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| route_id | string | No | No | - |  |
| calendar_id | string | No | No | - |  |
####Responses
| Code | Result | 
|  ---  |  ---  | 
| 200 | [trip] |

##planned_trip
A trip as planned for a particular user.  Effectiveliy, a set of steps to get from stop A to stop B.
###Fields
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| steps | [planned_trip_step] | No | Yes | - |  |
###Operations
####/planned_trip
####Parameters
| Name | Type | Required? | Multi Valued? | Default | Description | 
|  ---  |  ---  |  ---  |  ---  |  ---  |  ---  | 
| departure_stop_id | string | No | No | - |  |
| destination_stop_id | string | No | No | - |  |
| departure_date_time | date-time-iso8601 | Yes | No | - | Defaults to right now if not provided. |
####Responses
| Code | Result | 
|  ---  |  ---  | 
| 200 | [planned_trip] |





## License

(The MIT License)

Copyright (c) 2012 Brendan Nee <me@bn.ee>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
