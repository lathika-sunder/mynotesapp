/**
 * Get/ Homepage
 */

exports.homepage= async(req,res) => {

        const locals= {
            title: 'Notes by Lathika',
            description: 'Free NodeJs Notes app'
        }
    
    
    
        res.render("index",{
            locals,
            layout : '../views/layouts/front-page'
        });
    
}

/**
 * Get/ About
 */

exports.about= async(req,res) => {

    const locals= {
        title: 'About Notes by Lathika',
        description: 'Free NodeJs Notes app'
    }



    res.render("about",locals);

}
exports.faq= async(req,res) => {

    const locals= {
        title: 'FAQs - Notes by Lathika',
        description: 'Free NodeJs Notes app'
    }



    res.render("faq",locals);

}
exports.features= async(req,res) => {

    const locals= {
        title: 'Features - Notes by Lathika',
        description: 'Free NodeJs Notes app'
    }



    res.render("features",locals);

}