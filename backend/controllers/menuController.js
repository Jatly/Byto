import Menu from "../models/Menu.js";
import Branch from "../models/Branch.js";

// =====================================
//  CREATE MENU
// =====================================

export const createMenu = async(req,res)=>{
    try{
            const {
      branch,
      name,
      description,
      images,
      category,
      price,
      discountPrice,
      isVeg,
      dietType,
      calories,
      protein,
      carbs,
      fat,
      preparationTime,
      subscriptionEligible,
      addons,
    } = req.body;
// CHECK IF BRANCH EXISTS
    const existingBranch = await Branch.findById(branch);
    if(!existingBranch || existingBranch.isDeleted){
        return res.status(404).json({message:"Branch not found"});
    }
    // Owner Ship Check
    if(existingBranch.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"Unauthorized to add menu to this branch"});
    }

    //create menu
    const menu =  await Menu.create({
        branch,
        name: name.trim(),
        description,
        images,
        category,
        price,
        discountPrice,
        isVeg,
        dietType,
        calories,
        protein,
        carbs,
        fat,
        preparationTime,
        subscriptionEligible,
        addons,
    })
    res.status(201).json({success:true,
        message:"Menu item created successfully",
        menu,
    })
} catch(error){
    console.error("Error creating menu item:", error);
   res.status(500).json({success:false,message:"Server error while creating menu item"});
}}

// =====================================
//  GET MENUS BY BRANCH
// =====================================
export const getBranchMenus = async(req,res)=>{
    try{
        const {branchId} = req.params;

        const menus = await Menu.find({branch:branchId,isDeleted:false}).sort({createdAt:-1});
        res.json({success:true,menus,count:menus.length});

    } catch(error){
        console.error("Error fetching branch menus:", error);
        res.status(500).json({success:false,message:"Server error while fetching branch menus"});
    }
}