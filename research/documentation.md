# Using geoJSON data and shaping polygons in OpenStreetMaps

Overpass API

Using geoJSON data from [GeoJSON Maps](https://geojson-maps.kyd.au/) to get a dataset of the boundaries (latitude, longitude) of all the cities in the world to draw a polygon on our OpenStreetMaps API and then further use that to search for nodes, ways, relations on the said platform

Why did we go with this:
1) File size and format were appropriate
2) All the cities in the world 
3) A lot of latitude and longitude data for making a polygon for a city's boundary
4) Aptly detailed 

## What I tried so far
>> [GeoPackage data from Natural Earth](https://www.naturalearthdata.com/downloads/)
- Why I didn't go with this:
    1) Geo Package data was too huge to work with, we tried another boundaries .dbf file that we found on the website and we didn't go with that because the columns did not have GeoJSON data in any manner.
>> [ArcGIS](https://hub.arcgis.com/datasets/schools-BE::world-cities/explore?location=2.208934%2C1.535150%2C1.57)
- Why I didnt go with this:
    1) Too less data, did not cover all the cities in the world like we wanted
>> [GeoJSON on 34000 cities](https://github.com/drei01/geojson-world-cities)
- Why I didn't choose this:
    1) This was the dataset we were going to go with however the dataset did not have countries in it only city name. Our faith in this dataset was also not a lot because majority of the data did not share a lot of latitude, longitude coordinates that we needed for our project.


We currently have 1.5 gigs of zipped data on geoJSON and world's cities' boundaries