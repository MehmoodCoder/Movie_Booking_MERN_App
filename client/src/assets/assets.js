export const dummyTrailers = [
  {
    image: "https://img.youtube.com/vi/WpW361dAqnM/maxresdefault.jpg",
    videoUrl: 'https://www.youtube.com/watch?v=-sAOWhvhek8'
  },
  {
    image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
    videoUrl: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y'
  },
  {
    image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
    videoUrl: 'https://www.youtube.com/watch?v=umiKiW4En9g'
  }
]

export const dummyCastsData = [
  { "name": "Milla Jovovich", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZSJ0qFM00y.jpg" },
  { "name": "Dave Bautista", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiX0OoRjPtuH5VMoy6qbd32.jpg" },
  { "name": "Arly Jover", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" },
  { "name": "Amara Okereke", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTjTWXHUpACVzny4.jpg" },
  { "name": "Fraser James", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKfkp9YpVcSqcbgY.jpg" },
  { "name": "Deirdre Mullins", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuIVlYISEQnpGZA5kTanP.jpg" },
  { "name": "Sebastian Stankiewicz", "profile_path": "https://image.tmdb.org/t/p/original/..." },
  { "name": "Ian Hanmore", "profile_path": "https://image.tmdb.org/t/p/original/yHI4MK5atavKBD9wiJta01say1p.jpg" },
  { "name": "Eveline Hall", "profile_path": "https://image.tmdb.org/t/p/original/upQ4xUPiJIMW5rxF9AT0GrRqgJY.jpg" },
  { "name": "Kamila Klamut", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZSJ0qFM00y.jpg" },
  { "name": "Caoilinn Springall", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHow1BYo74U1q1TarIrdiY.jpg" },
  { "name": "Jan Kowalewski", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiX0OoRjPtuH5VMoy6qbd32.jpg" },
  { "name": "Paweł Wysocki", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" },
  { "name": "Simon Lööf", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg" },
  { "name": "Tomasz Cymerman", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTjTWXHUpACVzny4.jpg" }
]

export const dummyShowsData = [
  {
    "_id": "324544",
    "id": "324544",
    "title": "In the Lost Lands",
    "overview": "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide, the drifter Boyce, must outwit and outfight both man and demon.",
    "poster_path": "https://image.tmdb.org/t/p/original/dD1fjR7gllmR8HTeN6rfryHtdwX.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/op3qmNhwvEVyT7UFyPbIfQmKriB.jpg",
    "genres": [
      { "id": 28, "name": "Action" }
    ],
    "tagline": "Everyone deserves a second shot.",
    "vote_average": 7.443,
    "runtime": 127
  }
]

export const dummyDateTimeData = {
  "2025-07-24": [
    { "time": "2025-07-24T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
    { "time": "2025-07-24T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
    { "time": "2025-07-24T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
  ],
  "2025-07-25": [
    { "time": "2025-07-25T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd4" },
    { "time": "2025-07-25T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd5" }
  ]
}

export const dummyBookingData = [
  {
    "_id": "68396334fb83252d82e17295",
    "user": { "name": "GreatStack" },
    "show": {
      "_id": "68352363e96d99513e4221a4",
      "movie": dummyShowsData[0],
      "showDateTime": "2025-06-30T02:30:00.000Z",
      "showPrice": 59
    },
    "amount": 98,
    "bookedSeats": ["D1", "D2"],
    "isPaid": false
  },
  {
    "_id": "68396334fb83252d82e17295",
    "user": { "name": "GreatStack" },
    "show": {
      "_id": "68352363e96d99513e4221a4",
      "movie": dummyShowsData[0],
      "showDateTime": "2025-06-30T02:30:00.000Z",
      "showPrice": 59
    },
    "amount": 49,
    "bookedSeats": ["A1"],
    "isPaid": true
  },
  {
    "_id": "68396334fb83252d82e17295",
    "user": { "name": "GreatStack" },
    "show": {
      "_id": "68352363e96d99513e4221a4",
      "movie": dummyShowsData[0],
      "showDateTime": "2025-06-30T02:30:00.000Z",
      "showPrice": 59
    },
    "amount": 147,
    "bookedSeats": ["A1", "A2", "A3"],
    "isPaid": true
  }
]