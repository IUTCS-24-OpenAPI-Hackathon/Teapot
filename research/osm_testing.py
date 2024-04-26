import json
import requests

def get_places_of_interest(latitude, longitude, radius=1000):
    overpass_url = "https://lz4.overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    (
      node(around:{radius},{latitude},{longitude})["tourism"~".*"];
      node(around:{radius},{latitude},{longitude})["historical"~".*"];
      node(around:{radius},{latitude},{longitude})["natural"~".*"];
      node(around:{radius},{latitude},{longitude})["leisure"~".*"];
      node(around:{radius},{latitude},{longitude})["shop"~".*"];
      node(around:{radius},{latitude},{longitude})["artwork_type"~".*"];
      node(around:{radius},{latitude},{longitude})["facility:nature"~".*"];
      node(around:{radius},{latitude},{longitude})["religion"~".*"];
      node(around:{radius},{latitude},{longitude})["parks"~".*"];
      node(around:{radius},{latitude},{longitude})["amenity"~"place_of_worship"];
      node(around:{radius},{latitude},{longitude})["amenity"~"restaurant"];
      node(around:{radius},{latitude},{longitude})["amenity"~"cafe"];
      node(around:{radius},{latitude},{longitude})["amenity"~"fast_food"];
      node(around:{radius},{latitude},{longitude})["amenity"~"library"];
      node(around:{radius},{latitude},{longitude})["amenity"~"bar"];
      node(around:{radius},{latitude},{longitude})["amenity"~"pub"];
    );
    out body;
    >;
    out skel qt;
    """
    response = requests.get(overpass_url, params={'data': query})
    data = response.json()
    return data

def save_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def main():
    latitude, longitude = 52.347177, 4.902381
    
    radius = 100  # in meters
    
    data = get_places_of_interest(latitude, longitude, radius)
    # save_json(data, 'amsterdam.json')
    
    # Print organized data
    for element in data.get('elements', []):
        if 'tags' in element:
            print(f"Type: {element['type']}, ID: {element['id']}")
            for key, value in element['tags'].items():
                print(f"  {key}: {value}")
            print()

if __name__ == "__main__":
    main()
