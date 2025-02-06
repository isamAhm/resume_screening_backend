const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const AdminSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  past_applications: {type: String},
});

//login
AdminSchema.statics.login = async function(email, password){
  const admin = await Admin.findOne({email})
  if(admin){
      const auth = admin.password
      if(auth){
          return admin
      }throw Error('incorrect password')
  }throw Error('incorrect email')
}

const Admin = mongoose.model('Admin', AdminSchema)
// Export model
module.exports = Admin;