const { request } = require("express");
const User=require("../models/user.model");

exports.listUsers=async (request,response)=>{
    try {
        const users= await User.find();
        response.status(200).json(users)
        
    } catch (error) {
        response.status(400).json({message:error.message})
    }
};
exports.updateUser=async(request, response)=>{
    try {
        const {userId}=request.params;
        const updateData=request.body;

         const updateUser=await User.findByIdAndUpdate(userId,updateData,{
            new:true,
            runValidators:true
         });
         if(!updateUser){
            response.status(400).json({message:"Failed to Updated User !!!"});
         }
         response.status(200).json(updateUser)
        
    } catch (error) {
        response.status(400).json({message:error.message})
    }
};

exports.deleteUser=async(request,response)=>{
    try {
        const {userId}=request.params;
        const deleteUser=await User.findByIdAndDelete(userId);

        if(!deleteUser){
            response.status(400).json({message:"unable to delete user"})
        }
        response.status(200).json({message:"user deleted",deleteUser})
    } catch (error) {
        response.status(500).json({message:error.message})
    }
}