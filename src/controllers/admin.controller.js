const { request } = require("express");
const User=require("../models/user.model");

const bcrypt = require("bcryptjs");
const { isPasswordValid } = require("../validation-rules/passwordValidator"); 

exports.listUsers=async (request,response)=>{
    try {
        const users= await User.find();
        response.status(200).json(users)
        
    } catch (error) {
        response.status(400).json({message:error.message})
    }
};
exports.updateUser = async (request, response) => {
  try {
    const { userId } = request.params;
    const updateData = request.body;

    // Validate and hash password if it's being updated
    if (updateData.password) {
      if (!isPasswordValid(updateData.password)) {
        return response.status(400).json({
          message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        });
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      runValidators: true
    });
    if (!updatedUser) {
      return response.status(400).json({ message: "Failed to update user!" });
    }
    response.status(200).json(updatedUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
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