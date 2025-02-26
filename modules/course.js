import { Schema, model } from "mongoose"

export const courseSchema = Schema({
    name: String,
    describe: String,
    openingDate: Date,
    long: Number,
    img: String,
    price: Number,
    categories: {
        type: String,
        enum: ['EDUCATION',
            'PROGRAMMING',
            'DESIGN',
            'BUSINESS',
            'MUSIC',
            'FITNESS',
            'DEVELOPMENT',
            'COOKING',
            'GAMING',
            'PHOTOGRAPHY',   
            'TRAVEL',
            'CONDTORIA',
            'DIET'
        ] 

    },
    motivation:String,
    locations: [String]
})

export const courseModel = model("courses", courseSchema)