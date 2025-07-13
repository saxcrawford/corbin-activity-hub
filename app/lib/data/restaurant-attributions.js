const restaurantAttributions = [
    {
        id: 1,
        startAuthor: "By Michael Rivera",
        startAuthorWiki: "User:Mjrmtg",
        link: "https://commons.wikimedia.org/wiki/User:Mjrmtg",
        linkCC: "https://commons.wikimedia.org/w/index.php?curid=40559229",
        creativeCommons: "CC BY-SA 4.0",
        linkWiki: "https://creativecommons.org/licenses/by-sa/4.0",
    },
    {
        id: 2,
        startAuthor: "",
        startAuthorWiki: "Link",
        link: "",
        linkCC: "https://commons.wikimedia.org/w/index.php?curid=161452",
        creativeCommons: "CC BY-SA 3.0",
        linkWiki: "http://creativecommons.org/licenses/by-sa/3.0/",
    },
    {
        id: 3,
        startAuthor: "Photo by: Janet Powell a.k.a.",
        startAuthorWiki: "w:User:Syra987",
        link: "https://commons.wikimedia.org/w/index.php?curid=155938243",
        linkCC: "https://creativecommons.org/licenses/by-sa/2.5",
        creativeCommons: "CC BY-SA 2.5",
        linkWiki: "https://commons.wikimedia.org/w/index.php?curid=155938243",
    },
];

function getRestaurantAttributions() {
    return restaurantAttributions;
}

export { getRestaurantAttributions };
