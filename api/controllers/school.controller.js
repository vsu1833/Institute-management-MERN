// This line imports the 'bcrypt' library, which helps us securely store passwords.
// The 'bcrypt' library is used to securely hash passwords, protecting them from unauthorized access and ensuring that even if the database is compromised, the actual passwords remain safe from attackers.
const bcrypt = require('bcrypt');

// This line imports the 'formidable' library, which helps us handle file uploads.
const formidable = require('formidable');

// This line loads the environment variables from the .env file, so we can use them in our code.
require('dotenv').config();

// This line imports the 'schoolModel' from the '../models/school_model' file.
const schoolModel = require('../models/school_model');

// This line imports the 'fs' library, which helps us work with files.
const fs = require('fs');

// This line imports the 'path' library, which helps us work with file paths.
const path = require('path');
const jwt = require('jsonwebtoken');
// This line exports an object with a method called 'registerSchool'.
module.exports = {
    registerSchool : async (req, res) => {
        // This line creates a new instance of the 'formidable.IncomingForm' class.
        const form = new formidable.IncomingForm();

        // This line parses the incoming request and saves the form data and uploaded files to the 'fields' and 'files' variables.
        form.parse(req, async(err, fields, files) => {
            if (err) {
                // This line sends a response with a status code of 400 and an error message if there was an error parsing the files.
                return res.status(400).send('Error parsing the files');
            }
            try {
                // This line gets the first uploaded file from the 'files' object.
                const photo = files.image[0];

                // This line gets the file path of the uploaded file.
                let filepath = photo.filepath;

                // This line replaces any spaces in the original file name with underscores.
                let originalFilename = photo.originalFilename.replace(" ","_");

                // This line creates a new file path using the current directory, the 'SCHOOL_IMAGE_PATH' environment variable, and the original file name.
                let newpath = path.join(__dirname ,process.env.SCHOOL_IMAGE_PATH , originalFilename);

                // This line reads the contents of the uploaded file and saves it to the new file path.
                let photoData = fs.readFileSync(filepath);
                fs.writeFileSync(newpath , photoData);

                // This line generates a salt for hashing the password.
                const salt =  bcrypt.genSaltSync(10);

                // This line hashes the password using the salt.
                const hashedPassword =  bcrypt.hashSync (fields.password[0], salt);

                // This line creates a new instance of the 'schoolModel' with the form data and the hashed password.
                const newSchool = new schoolModel({
                    school_name : fields.school_name[0],
                    email : fields.email[0],
                    owner_name : fields.owner_name[0],
                    password : hashedPassword,
                });

                // This line saves the new school to the database and waits for it to complete.
                const savedSchool = await newSchool.save();

                // This line sends a response with a status code of 200, the saved school data, and a success message.
                res.status(200).json({success:true, data:savedSchool, message:"School registered successfully"});
            } catch (error) {
                // This line sends a response with a status code of 500 and an error message if there was an error registering the school.
                res.status(500).json({success: false, message: "An error occurred while registering the school", error: error.message});
            }
        });
    },
    loginSchool: async (req, res) => {
        try {
            const school = await schoolModel.findOne({ email: req.body.email });
            if (!school) {
                return res.status(404).json({ success: false, message: "School not found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, school.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ success: false, message: "Invalid password" });
            } else {
                const jwtsecret = process.env.JWT_SECRET;
                const token = jwt.sign({   
                    id: school._id,
                    schoolId: school._id,
                    school_name: school.school_name,
                    owner_name: school.owner_name,
                    image_url: school.image_url,
                    role: "school" }, jwtsecret);
                res.header('Authorization', token);
                //TODO: We need to generate a token for the user upon successful login(each time the user logs in) and send it to the client.
                //TODO: Additionally, we should store the token in the database for future reference.
                //TODO: The response will include the following user data:
                res.status(200).json({
                    success: true,
                    message:"School logged in successfully",
                    user: {
                        id: school._id,
                        school_name: school.school_name,
                        owner_name: school.owner_name,
                        image_url: school.image_url,
                        role: "school"
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "An error occurred while logging in", error: error.message });
        }
    },
    getAllSchools: async (req, res) => {

}
}