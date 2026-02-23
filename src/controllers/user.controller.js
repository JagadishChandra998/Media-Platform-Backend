import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import  {User}  from "../models/user.model.js";
import { uplodeOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/AipResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exites: username, mail
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from respone
    //check  for the user creation
    //return respone


    //get user details from frontend
    const { fullName, email, userName, password } = req.body
    console.log("email", email);


    //validation - not empty

    // if ( fullName === ""){
    //     throw new ApiError(400, "fullname is required")
    // }
    if ([fullName, email, userName, password].some((fields) => fields?.trim() === "")) {    // .some gives true and false
        throw new ApiError(400, "all fields are required")
    }

    
    //check if user already exites: username, mail
    const existedUser = User.findOne(
        {
            $or: [{ userName }, { email }]
        }
    )

    if (existedUser) {
        throw new ApiError(409, "userName or email already exists")
    }


    //check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    //upload them to cloudinary, avatar
    const avatar = await uplodeOnCloudinary(avatarLocalPath)
    const coverImage = await uplodeOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    //create user object - create entry in db
    const User = await User.create(
        {
            fullName,
            avatar:avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            userName:userName.toLowerCase()
        }
    )

    //remove password and refresh token field from respone
    const createdUser = await User.findById(User._id).select( "-password -refreshToken" )
 
    //check  for the user creation
    if(!createdUser){                

        throw new ApiError (500, "SOmething went wrong while registering the user")
    }

    //return respone
    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered Successflly")  
    )


})

export { registerUser }