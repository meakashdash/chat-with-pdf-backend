import mongoose from 'mongoose'

const chatSchema=new mongoose.Schema({
    contextId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Context',
        required: true
    },
    messages: [
        {
            userMessage: {
                type: String,
                required: true
            },
            botResponse: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

export const ChatHistory=mongoose.model('ChatHistory',chatSchema)