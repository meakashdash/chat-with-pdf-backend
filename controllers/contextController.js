import axios from "axios";
import FormData from "form-data";
import { Context } from "../models/contextModel.js";
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from "mongodb";

export const createContext = async (req, res) => {
  try {
    const contextName = req.body.contextName;
    const files = req.files;

    const formData = new FormData();
    formData.append("contextName", contextName);

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append("selectedFiles", files[i].buffer, { filename: files[i].originalname });
      }
    }

    const response = await axios.post(
      "http://localhost:5000/process-pdf",
      formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }
    );

    const newContext=new Context({
      contextId:uuidv4().toString(),
      contextName:contextName,
      contents:[{
        fileName:files[0].originalname,
        file:files[0].buffer,
        fileSize:files[0].size,
        uploadedAt:new Date(),
        vectorKeys:response.data.document_ids
      }]
    })
    await newContext.save()

    res.json({
      message:"Context Created Successfully",
      fileName:files[0].originalname,
      fileSize:files[0].fileSize,
      file:files[0].buffer,
      keys:response.data.document_ids
    })
  } catch (error) {
    console.error("Error creating contexts:", error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

export const getAllContexts=async(req,res)=>{
  try {
    const contexts=await Context.find({}).sort({ createdAt: -1 })
    return res.json({
      contexts
    })
  } catch (error) {
    console.error("Error getting contexts:", error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
}

export const getContextById=async(req,res)=>{
  try {
    if(!req.params.contextId){
      res.status(400).json({
        statusCode: 400,
        message: "Please provide context id"
      });
    }
    const context=await Context.findOne({_id:new ObjectId(req.params.contextId)});
    return res.json({
      context
    })
  } catch (error) {
    console.error("Error getting context by id:", error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
}

export const deletePdf=async(req,res)=>{
  try {
    const {contextId,pdfId}=req.body;
    const contextResponse=await Context.findOne({_id:new ObjectId(contextId)})
    contextResponse.contents=contextResponse.contents.filter((content)=>{
      return content._id===pdfId
    })
    
    res.json({contextResponse})
  } catch (error) {
    console.error("Error deleting pdf:", error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
}
