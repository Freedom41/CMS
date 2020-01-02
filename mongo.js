const mongoose = require('mongoose')
const env = require('dotenv').config();
const db = process.env.DB;

mongoose.connect(db, {useNewUrlParser: true, useFindAndModify: false, poolSize: 4, useUnifiedTopology: true}, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})

const mentorSchema = new mongoose.Schema({
        name : {type: String, required: true, minlength: 2, unique: true},
        img : {type: String},
        sector : {type: String, required: true},
        company: { type: String, required: true },
        college: {type: String},
        field: {type: String},
        posting: { type: String },
        cgpa: { type: String },
        XthPercen: { type: String },
        XIIPercent: { type: String },
        intern: { type: String },
        otherachievements: {type: String},
        otherShortlist: {type: String},
        academy: {type: Number, min: 1, max: 3},
        xtracir: { type: Number, min: 1, max: 3 },
        internship: { type: Number, min: 1, max: 3 },
        responsibility: { type: Number, min: 1, max: 3 },
        resume: {type: String}
})

const Mentor = mongoose.model('Mentor', mentorSchema)

module.exports = Mentor