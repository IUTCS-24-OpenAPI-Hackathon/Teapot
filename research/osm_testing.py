import requests

def get_places_of_interest(latitude, longitude, radius=1000):
    overpass_url = "https://lz4.overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    (
      node(around:{radius},{latitude},{longitude})["amenity"="hospital"];
      node(around:{radius},{latitude},{longitude})["tourism"="hotel"];
      node(around:{radius},{latitude},{longitude})["amenity"="restaurant"];
      node(around:{radius},{latitude},{longitude})["tourism"="attraction"];
    );
    out body;
    >;
    out skel qt;
    """
    response = requests.get(overpass_url, params={'data': query})
    data = response.json()
    print(data)
    return data

def parse_response(data):
    places_of_interest = {
        "hospitals": [],
        "hotels": [],
        "restaurants": [],
        "tourist_spots": []
    }
    
    for element in data['elements']:
        tags = element.get('tags', {})
        name = tags.get('name')
        category = tags.get('amenity') or tags.get('tourism')
        latitude = element.get('lat')
        longitude = element.get('lon')
        
        # Skip if any essential data is missing
        if not name or not category or not latitude or not longitude:
            continue
        
        # Ensure uniqueness
        place = {"name": name, "category": category, "latitude": latitude, "longitude": longitude}
        if place in places_of_interest[category + 's']:
            continue
        
        places_of_interest[category + 's'].append(place)
    
    return places_of_interest

def main():
    latitude = 21.415497395102097
    longitude = 91.98328095123344
    radius = 1000  # in meters
    
    data = get_places_of_interest(latitude, longitude, radius)
    places_of_interest = parse_response(data)
    
    # Print the places of interest
    for category, places in places_of_interest.items():
        x=(f"{category.capitalize()}:")
        for place in places:
            print(f"  Name: {place['name']}, Category: {place['category']}, Location: ({place['latitude']}, {place['longitude']})")

if __name__ == "__main__":
    main()
