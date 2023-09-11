import express from "express";

const app = express();
const port = 3000;

// Serve static files (like images) using the express.static middleware
app.use(express.static('resources'));

// By default, the Express framework looks in a folder named views for the view templates
app.get("/", (req, res) => {
    const dayOfWeek = new Date().getDay();
    console.log(`Today is day ${dayOfWeek} of the week`);

    let type = "a weekday";
    let advice = "It is time to work hard 💪 !!!"
    let img_src = "/hardworking.jpeg";

    if (dayOfWeek == 0 || dayOfWeek == 6) {
        type = "the weekend";
        advice = "It is time to have fun 🤩 !!!"
        img_src = "/happy_dog.jpeg";
    } 
    
    res.render("index.ejs", {
        dayType: type,
        adviceForTheDay: advice,
        imgResource: img_src,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});