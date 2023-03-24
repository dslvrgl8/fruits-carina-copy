const express = require('express');
const app = express();
const port = 4000
const methodOverride = require('method-override')
// CONTROLLER
const fruitsController = require('./controllers/fruits');

// Models - Database stuff
const models = require('./models/Fruits');

const fruits = models.fruits


// controllers - routes
// views - EJS files (EJS is literally just HTML and JS)

// Middleware req -> middleware -> res
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:false }));
app.use(express.json()); //parse JSON data in the request body
app.use(methodOverride('_method'));

app.use((req,res,next) => {
    console.log('this is my own middleware')
    next()
})


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

app.use('/fruits', fruitsController);

app.get('/*', (req, res) => {
    res.render("404.ejs")
})

app.put('/fruits/:indexOfFruitsArray', (req, res) => { //:indexOfFruitsArray is the index of our fruits array that we want to change
	if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
		req.body.readyToEat = true;
	} else { //if not checked, req.body.readyToEat is undefined
		req.body.readyToEat = false;
	}
	fruits[req.params.indexOfFruitsArray] = req.body; //in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
	res.redirect('/fruits'); //redirect to the index page
});

// Listen at the bottom
app.listen(port, () => {
    console.log(`🏝️ Server is listening to PORT ${port} 🎧`)
})