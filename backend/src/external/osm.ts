// define the osm service schemas and methods to use them here.
import { z } from "zod";

// const attractionSchema = z.object({
//   name: z.string(),
//   description: z.string(),
// });

// type AttractionType = z.infer<typeof attractionSchema>;

const osmApiResponseSchema = z.object({
  version: z.string(),
  generator: z.string(),
  osm3s: z.object({
    timestamp_osm_base: z.string(),
    copyright: z.string(),
  }),
  elements: z.array(
    z.object({
      type: z.string(),
      id: z.number(),
      lat: z.number(),
      lon: z.number(),
      tags: z.object({
        name: z.string().optional(),

        "addr:city": z.string().optional(),
        "addr:housenumber": z.string().optional(),
        "addr:postcode": z.string().optional(),
        "addr:street": z.string().optional(),

        tourism: z.string().optional(),
        natural: z.string().optional(),
        historical: z.string().optional(),
        leisure: z.string().optional(),
        amenity: z.string().optional(),
        shop: z.string().optional(),
        artwork_type: z.string().optional(),
        "facility:nature": z.string().optional(),
        religion: z.string().optional(),
        parks: z.string().optional(),
      }),
    })
  ),
});

type OSMApiResponseType = z.infer<typeof osmApiResponseSchema>;

async function getAttractions(
  latitude: number,
  longitude: number,
  radius: number
) {
  const overpassUrl = "https://lz4.overpass-api.de/api/interpreter"; // Using LZ4 compressed endpoint for faster responses
  const query = `
          [out:json];
          (
            node(around:${radius},${latitude},${longitude})["tourism"~".*"];
            node(around:${radius},${latitude},${longitude})["historical"~".*"];
            node(around:${radius},${latitude},${longitude})["natural"~".*"];
            node(around:${radius},${latitude},${longitude})["leisure"~".*"];
            node(around:${radius},${latitude},${longitude})["shop"~".*"];
            node(around:${radius},${latitude},${longitude})["artwork_type"~".*"];
            node(around:${radius},${latitude},${longitude})["facility:nature"~".*"];
            node(around:${radius},${latitude},${longitude})["religion"~".*"];
            node(around:${radius},${latitude},${longitude})["parks"~".*"];
            node(around:${radius},${latitude},${longitude})["amenity"~"place_of_worship"];
            node(around:${radius},${latitude},${longitude})["amenity"~"restaurant"];
            node(around:${radius},${latitude},${longitude})["amenity"~"cafe"];
            node(around:${radius},${latitude},${longitude})["amenity"~"fast_food"];
            node(around:${radius},${latitude},${longitude})["amenity"~"library"];
            node(around:${radius},${latitude},${longitude})["amenity"~"bar"];
            node(around:${radius},${latitude},${longitude})["amenity"~"pub"];
          );
          out body;
          >;
          out skel qt;
      `;
  const response = await fetch(overpassUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `data=${encodeURIComponent(query)}`,
  });
  const data = (await response.json()) as OSMApiResponseType;

  return data;
}

export const findAttractionsAroundCoords = async (
  lat: number,
  lon: number,
  radius: number
) => {
  const attractions = await getAttractions(lat, lon, radius);

  const response = attractions.elements.map((a) => {
    if (a.tags?.name) {
      const description = [];

      if (a.tags.tourism) {
        description.push("Tourism");
      }

      if (a.tags.natural) {
        description.push("Natural");
      }

      if (a.tags.historical) {
        description.push("Historical");
      }

      if (a.tags.leisure) {
        description.push("Leisure");
      }

      if (a.tags.shop) {
        description.push("Shop");
      }

      if (a.tags["facility:nature"]) {
        description.push("Nature");
      }

      if (a.tags.artwork_type) {
        description.push("Artwork");
      }
      if (a.tags.religion) {
        description.push("Religion");
      }

      if (a.tags.parks) {
        description.push("Park");
      }

      if (a.tags.amenity) {
        description.push(a.tags.amenity);
      }

      return {
        id: a.id,
        name: a.tags?.name,
        description: description,
        lat: a.lat,
        lon: a.lon,
        coords: [a.lat, a.lon],
      };
    }
  });

  return response.filter((r) => {
    if (r) {
      return r;
    }
  });
};
