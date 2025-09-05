const mongoose = require("mongoose");
const taxSchema = new mongoose.Schema({
    name:{type:String,required:true},
    cgst_percent:{type:Number},
    sgst_percent:{type:Number},
    igst_percent:{type:Number},
    cess_percent:{type:Number},
    is_inclusive: { type: Boolean, enum: ["active", "inactive"], default: "active" },
},
 { timestamps: true }
)
module.exports = mongoose.model("Tax",taxSchema)