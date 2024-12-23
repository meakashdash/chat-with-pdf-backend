import mongoose from 'mongoose'

const contextSchema=new mongoose.Schema({
    contextId:{
        type:String,
        required:true,
        unique:true
    },
    contextName:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    contents:[
        {
            fileName:{
                type:String,
                required:true
            },
            file:{
                type: Buffer,
                required: true
            },
            fileSize: {
                type: Number,
                required: true
            },
            uploadedAt:{
                type:Date,
                default:Date.now
            },
            vectorKeys: {
                type: [String],
                default: undefined
            }
        }
    ]
})

export const Context=mongoose.model('Context',contextSchema)