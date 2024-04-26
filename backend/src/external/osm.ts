// define the osm service schemas and methods to use them here.
import { z } from "zod";

const attractionSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type AttractionType = z.infer<typeof attractionSchema>;

async function getAttractions(
  latitude: number,
  longitude: number,
  radius: number
) {
  const overpassUrl = "https://lz4.overpass-api.de/api/interpreter"; // Using LZ4 compressed endpoint for faster responses
  const query = `
          [out:json];
          (
            node["${"tourism"}"](around:${radius},${latitude},${longitude});
            node["${"amenity"}"](around:${radius},${latitude},${longitude});
            node["${"shop"}"](around:${radius},${latitude},${longitude});
            node["${"leisure"}"](around:${radius},${latitude},${longitude});
            node["${"food"}"](around:${radius},${latitude},${longitude});
            node["${"transport"}"](around:${radius},${latitude},${longitude});
            node["${"healthcare"}"](around:${radius},${latitude},${longitude});
            node["${"education"}"](around:${radius},${latitude},${longitude});
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
  const data = await response.json();
  return data;
}

export const findAttractionsAroundCoords = async (
  lat: number,
  lon: number,
  radius: number
) => {
  //   const attractions = await getAttractions(lat, lon, radius);
  return [
    {
      name: "Tomato",
      description: "this is a red looking thingy",
    },
    {
      name: "Potato",
      description: "this is a yellow looking food that everyone loves",
    },
  ];
};
