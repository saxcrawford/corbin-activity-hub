const restaurants = [
    {
        id: 1,
        name: "Bubby's BBQ",
        type: "Buffet",
        cuisine: "Barbecue, American",
        description: "The Wrigley Taproom & Brewery is dedicated to serving local, seasonal cuisine alongside craft beers in a relaxed atmosphere. Our menu features ingredients sourced from Kentucky farmers.",
        rating: 4.5,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$",
    },
    {
        id: 2,
        name: "King Buffet",
        type: "Buffet",
        cuisine: "Barbecue, American",
        description: "The Wrigley Taproom & Brewery is dedicated to serving local, seasonal cuisine alongside craft beers in a relaxed atmosphere. Our menu features ingredients sourced from Kentucky farmers.",
        rating: 4.5,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$",
    },
]

function getRestaurants() {
    return restaurants;
}

function getRestaurantById(id) {
    return restaurants.find((restaurant) => restaurant.id === id);
}

function getRestaurantsByType(type) {
    return restaurants.filter(restaurant => restaurant.type === type);
}

export { getRestaurants, getRestaurantById, getRestaurantsByType };