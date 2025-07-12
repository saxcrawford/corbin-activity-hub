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
        description: "Authentic Indian cuisine with a focus on fresh, high-quality ingredients. Provides an enjoyable dining experience with popular dishes like Garlic Naan and Chicken Tikka Masala.",
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
    {
        id: 7,
        name: "Mi Casa Mexican Restaurant",
        cuisine: "Mexican",
        description: "Authentic Mexican dining experience with homemade dishes, including fresh guacamole made at your table, and provides private party rooms and a spacious patio.",
        rating: 4.4,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 8,
        name: "Old Town Grill",
        cuisine: "Bar & Grill",
        description: "Broad range of fresh steaks, chicken, and pasta dishes, aiming to provide a great dining experience with quality food and service. They also have a full bar.",
        rating: 4.1,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 9,
        name: "Santa Fe Mexican Restaurant",
        cuisine: "Mexican",
        description: "Fresh, authentic Mexican food in a family atmosphere, with options for dine-in and carry-out, and popular items like Cheese Dip and Classic Fajitas.",
        rating: 4.5,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 10,
        name: "Snappy Tomato Pizza",
        cuisine: "Pizza",
        description: "Pizza chain specializing in pizza, calzones, hoagies, salads, pasta, dessert, and appetizers, known for using fresh ingredients and an award-winning sauce.",
        rating: 4.3,
        image: "/images/restaurants/wrigley.jpg",
        priceRange: "$10-20 per person",
    },
    {
        id: 11,
        name: "Yamato Steak House",
        cuisine: "Japanese",
        description: "Offering authentic sushi and Japanese steak, aiming to provide high-quality Asian food and an extraordinary dining experience.",
        rating: 4.2,
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