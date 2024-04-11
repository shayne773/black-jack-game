import "./config.mjs";
import "./db.mjs";
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';

const Movie = mongoose.model("movie");
const app = express();
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:false}));
app.use(session({secret: "mySecret", saveUninitialized: false, resave:false}));

app.get("/movies", async (req,res) => {
    const query = req.query.director;
    let movies;
    if(query)
    {
        movies = await Movie.find({director:query});
    }
    else
    {
        movies = await Movie.find({});
    }
    res.render("movies", {movies : movies});
});

app.get("/movies/add", (req, res)=>{
    res.render("addMovie", {});
});

app.post("/movies/add", async (req, res)=>{
    const newTitle = req.body.title;
    const newYear = req.body.year;
    const newDirector = req.body.director;
    if(newTitle && newYear && newDirector)
    {
        const newMovie = new Movie({title:newTitle, year:newYear, director:newDirector});
        await newMovie.save();
        req.session.addedMovies = req.session.addedMovies || [];
        req.session.addedMovies.push(newMovie);
    }
    res.redirect("/movies");
});

app.get("/mymovies", (req, res)=>{
    const addedMovies = req.session.addedMovies || [];
    res.render("mymovies", {addedMovies:addedMovies});
});

app.get("/", (req, res)=>{
    res.redirect('/movies');
});
app.listen(process.env.PORT ?? 3000);
