

// track how many api request are coming to out site.
let count = 0;
const viewCount = (req, res, next) => {
    count++;
    console.log(count)
    next();
};

module.exports = viewCount;