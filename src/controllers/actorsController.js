const db=require('../database/models')

module.exports = {
    list : (req,res) => {
        db.Actor.findAll()
            .then((actors)=>{
                return res.render('actorsList',{actors})
            })
            .catch(error => console.log(error))
    },
    new : (req,res) => {

    },
    recommended : (req,res) => {

    },
    detail : (req,res) => {
        db.Actor.findByPk(req.params.id,{
            include:[
                {
                    association:'movie'
                }
            ]
        })
        .then(actor=> res.render('actorsDetail',{actor}))
        .catch(error => console.log(error))
    }
}