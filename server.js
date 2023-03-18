// These are just setting up an instance of express. Literally directly from Express' documentation. 
const express = require('express');
const app = express();
const port = 4000
const fruitsController = require('./controllers/fruits');
// console.log(fruitsController)

// This is going to the Fruits.js file in the models directory. It is set equal to the export from that file
const models = require('./models/Fruits');
// console.log(models);
// This is getting just the array of fruits. Not the whole object that has two key/value pairs.
const fruits = models.fruits
// Models - Database stuff
// controllers - routes
// views - EJS files (EJS is literally just HTML and JS)

// Middleware 
// This is a view engine that is looking for EJS files to be rendered. It also sets up that ALL the EJS files for my frontend will be located in a file named views
app.set('view engine', 'ejs');


// Routes
// Hungry for more to create my own API, and APIs always should be in JSON
app.get('/api', (req, res) => {
    res.json({
        models,
        status: 200
    })
})

app.get('/', (req, res) => {
    res.render('home.ejs');
})

// This is just my index route. I want this to be where I have a list of all my data. For example, all my products or fruits or star wars ships
app.get('/starwars', (req, res) => {
    res.render('starwars/index.ejs')
})

app.use('', fruitsController);

app.get('/*', (req, res) => {
    res.render("404.ejs")
})

// Listen at the bottom
app.listen(port, () => {
    console.log(`🏝️ Server is listening to PORT ${port} 🎧`)
})