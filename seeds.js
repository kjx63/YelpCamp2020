var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

const seeds = [{
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/5ee2dd454b56b10ff3d8992ccf2934771438dbf85254794e732c7dd69449_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Campground with trees",
        image: "https://pixabay.com/get/54e8d7464b5bab14f1dc84609620367d1c3ed9e04e507441722a7ed4904cc1_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/5ee0d4444957b10ff3d8992ccf2934771438dbf85254794e732c7dd69449_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

async function seedDB() {
    try {
        await Comment.remove({});
        await Campground.remove({});

        for (const seed of seeds) {
            let campground = Campground.create(seed);
            let comment = await Comment.create({
                text: "This place is great, but I wish there was internet",
                author: "KENJI"
            })
            campground.comments.push(comment);
            campground.save();
        }
    } catch (err) {
        console.log(err);

    }

}
module.exports = seedDB;