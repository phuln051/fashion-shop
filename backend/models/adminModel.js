const mongoose = require('mongoose');
const { Schema} = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = new Schema ({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

adminSchema.set("toJSON"), {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.password
    }
}

adminSchema.plugin(uniqueValidator, { message: "Email already"})
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;