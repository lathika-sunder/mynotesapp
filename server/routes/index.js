const express =require('express');
const router = express.Router();
const mainController =require("../controllers/mainController");

/**
 * App Routes
 */
router.get('/',mainController.homepage)
router.get('/about',mainController.about)
router.get('/faq',mainController.faq)
router.get('/features',mainController.features)

module.exports= router;











/*app.get('/', function(req,res){
    const locals= {
        title: 'NodeJs Notes',
        description: 'Free NodeJs Notes app'
    }



    res.render("index",locals);
});
*/