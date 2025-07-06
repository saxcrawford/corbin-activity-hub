const restaurants = [
    {
        id: 1,
        name: "Applebee's Grill + Bar",
        cuisine: "American",
        description: "Casual dining restaurant chain known for its mainstream American dishes, like burgers, salads, and \"riblets,\" served in a neighborhood grill and bar atmosphere.",
        rating: 4.1,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 2,
        name: "Amrit Cuisine of India",
        cuisine: "Indian",
        description: "Offers authentic Indian cuisine with a focus on fresh, high-quality ingredients. They aim to provide an enjoyable dining experience with popular dishes like Garlic Naan and Chicken Tikka Masala.",
        rating: 4.1,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 3,
        name: "Brooklyn Brothers Pizzeria",
        cuisine: "Pizza",
        description: "Offers New York-style pizza and Italian cuisine, featuring homemade recipes passed down through three generations.",
        rating: 4.3,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 4,
        name: "Bubby's BBQ",
        cuisine: "Barbecue",
        description: "Pulled pork, catfish & classic Southern sides offered in a straightforward buffet-style restaurant.",
        rating: 4.5,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 5,
        name: "Mr Gatti's Pizza",
        cuisine: "Pizza",
        description: "Offers a pizza buffet, salad bar, pasta bar, and a gameroom with bumper cars, making it a family-friendly dining and entertainment option.",
        rating: 3.7,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 6,
        name: "King Buffet LLC",
        cuisine: "Chinese",
        description: "Chinese buffet offering a wide range of flavorful dishes with fresh ingredients, including popular items like Egg Rolls and Crab Rangoon.",
        rating: 3.7,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
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