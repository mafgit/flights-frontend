const images = [
  {
    id: 1,
    image_url: "/city_images/karachi-1.jpg",
    city: "Karachi",
    country: "Pakistan",
    label: "Lorem ipsum dolor",
  },
  {
    id: 2,
    image_url: "/city_images/karachi-2.jpg",
    city: "Karachi",
    country: "Pakistan",
    label: "Lorem ipsum dolor",
  },
  {
    id: 3,
    image_url: "/city_images/lahore-1.jpg",
    city: "Lahore",
    country: "Pakistan",
    label: "Lorem ipsum dolor",
  },
  {
    id: 4,
    image_url: "/city_images/lahore-2.jpg",
    city: "Lahore",
    country: "Pakistan",
    label: "Lorem ipsum dolor",
  },
  {
    id: 5,
    image_url: "/city_images/new-york-1.jpg",
    city: "New York",
    country: "USA",
    label: "Lorem ipsum dolor",
  },
  {
    id: 6,
    image_url: "/city_images/new-york-2.jpg",
    city: "New York",
    country: "USA",
    label: "Lorem ipsum dolor",
  },
  {
    id: 7,
    image_url: "/city_images/dubai-1.jpg",
    city: "Dubai",
    country: "UAE",
    label: "Lorem ipsum dolor",
  },
  {
    id: 8,
    image_url: "/city_images/dubai-2.jpg",
    city: "Dubai",
    country: "UAE",
    label: "Lorem ipsum dolor",
  },
  {
    id: 9,
    image_url: "/city_images/london-1.jpg",
    city: "London",
    country: "UK",
    label: "Lorem ipsum dolor",
  },
  {
    id: 10,
    image_url: "/city_images/london-2.jpg",
    city: "London",
    country: "UK",
    label: "Lorem ipsum dolor",
  },
];

export const findByCity = (city: string, country?: string) => {
  const results = []

  for (const image of images) {
    if (image.city === city) {
      if (country && image.country !== country) {
        continue;
      }

      results.push(image);
    }
  }

  return results;
};
