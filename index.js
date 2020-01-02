const express = require('express');
const app = express();
const env = require('dotenv').config()
const port = process.env.PORT || 3000; 
const mentor = require('./mongo');
const errorhandler = require('./error')
const cors = require('cors');
const helmet = require('helmet');
const bodyparser = require('body-parser');

app.use(helmet())
app.use(express.static('build'))
app.use(bodyparser.json())
app.use(cors())

app.get("/api/adminpanel", async(req, res, next) => {
    let name = req.query.name;
    if(name) {
        let mentordata = mentor.findOne( {'name' : name}, (err, docs)  => {
            res.json(docs)
        })
        .catch(err => {
            next(err)
         })
    } else {
      return res.json(null).status(400)
  } 
})

app.post("/api/adminpanel", async (req, response,next) => {
    let data = req.body.data;
    let mentorData = new mentor({
            name: data.name,
            img: data.img,
            sector: data.sector,
            company: data.company,
            college: data.college,
            field: data.field,
            posting: data.posting,
            cgpa: data.cgpa,
            XthPercen: data.x,
            XIIPercent: data.xii,
            intern: data.intern,
            otherachievements: data.otherach,
            otherShortlist: data.othershort,
            academy: data.academy,
            xtracir: data.xtracir,
            internship: data.internship,
            responsibility: data.responsibility,
            resume: data.resume
    })
    
    await mentorData.save({ runValidators: true })
                    .then(res => {
                        return response.json("Saved")
                    })
                    .catch(err => {
                        next(err)
                    })

})

app.put("/api/adminpanel/:id", async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;

    if(id) {
        let mentordata = {
                img: data.img,
                sector: data.sector,
                company: data.company,
                college: data.college,
                field: data.field,
                posting: data.posting,
                cgpa: data.cgpa,
                XthPercen: data.x,
                XIIPercent: data.xii,
                intern: data.intern,
                otherachievements: data.otherach,
                otherShortlist: data.othershort,
                academy: data.academy,
                xtracir: data.xtracir,
                internship: data.internship,
                responsibility: data.responsibility,
                resume: data.resume
        };

        let obj = {}

        for(let i in mentordata) {
            if(mentordata[i]) {
                obj[i] = mentordata[i]
            }
        }

        let update = await mentor.findByIdAndUpdate(id, { "$set": obj }, { upsert: true, new: true }, (docs) => {
            res.json("Updated")
        })
        .catch(err => {
            next(err)
        }) 
        
    } else {
        return res.json('Incorrect Id').status(403)
    }
})

app.delete("/api/adminpanel/:id", async (req, res, next) => {
    let id = req.params.id;
    if(id) {
        let del = mentor.findByIdAndDelete(id, (docs) => {
            res.json("deleted").status(204)
        })
        .catch(err => {
            next(err)
        })
    } else {
        res.json("Incorrect / Malformed Id").status(403)
    }
})

app.use(errorhandler)

app.listen(port)
console.log(`Server is on ${port}`)