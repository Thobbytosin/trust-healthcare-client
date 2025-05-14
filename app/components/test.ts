// const fetchF = async () => {
//   const address = "Shomolu Lagos";
//   // const response = await fetch(
//   //   `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//   //     address
//   //   )}&key=e564ad177470465580777a55ef513b70`
//   // );

//   // const data = await response.json();

//   // const userLat = data?.results[0].geometry.lat;
//   // const userLng = data?.results[0].geometry.lng;

//   // console.log(userLat);
//   // console.log(userLng);

//   const response = await fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=6.5335645%2C+3.3841634&key=e564ad177470465580777a55ef513b70`
//   );

//   const data = await response.json();

//   const userLoc = data?.results[0].components;

//   console.log(userLoc);

//   // const token =
//   //   "pk.eyJ1IjoidGhvYmJ5dG9zaW4xMSIsImEiOiJjbWFucW1pa3AwMWoxMmtzNzM3ejM2dzFhIn0.Ow3Roo0fZZfWMdlpCheVeA";

//   // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//   //   address
//   // )}.json?access_token=${token}`;
//   // const latt = 6.7042101;
//   // const lngg = 3.4201954;
//   // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngg},${latt}.json?access_token=${token}`;

//   // const response = await fetch(url);
//   // const data = await response.json();

//   // const [lng, lat] = data.features[0]?.center || [];
//   // console.log(lat, lng);
//   // return { lat, lng };

//   // if (data.features && data.features.length > 0) {
//   //   console.log(data);
//   //   console.log(data.features[0].place_name);
//   //   return data.features[0].place_name; // Most relevant address
//   // } else {
//   //   throw new Error("No address found");
//   // }
// };

// const lat1 = 6.5187275;
// const lng1 = 3.3741408; //yaba colloge of technology

// const lat2 = 6.6303908;
// const lng2 = 3.3703277; // cedarview

// const lat1 = 6.6974487;
// const lng1 = 3.4164638; // wisebuyers

//   const lat1 = 6.5187275;
//   const lng1 = 3.3741408; //yaba colloge of technology

//   const lat2 = 6.45407;
//   const lng2 = 3.39467; // cedarview

//   const distance = getDistanceFromLatLonInKm(lat2, lng2, lat1, lng1);
// console.log(distance);
