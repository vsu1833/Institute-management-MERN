const bcrypt = require("bcrypt");
const formidable = require("formidable");
require("dotenv").config();
const schoolModel = require("../models/school_model");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// Ensure upload directory exists
const uploadDir = path.join(
  process.cwd(),
  "public",
  "images",
  "uploaded",
  "school"
);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

module.exports = {
  registerSchool: async (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Error parsing form data",
        });
      }

      try {
        const photo = files.image[0];
        if (!photo) {
          return res.status(400).json({
            success: false,
            message: "School image is required",
          });
        }
        let filepath = photo.filepath;

        // Process image upload
        const originalFilename = photo.originalFilename.replace(" ", "_"); //phot one
        const newPath = path.join(
          __dirname,
          process.env.SCHOOL_IMAGE_PATH,
          originalFilename
        );

        // Move uploaded file
        fs.renameSync(photo.filepath, newPath);

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(fields.password[0], salt);

        // Create school record
        const newSchool = new schoolModel({
          school_name: fields.school_name[0],
          email: fields.email[0],
          owner_name: fields.owner_name[0],
          school_image: originalFilename,
          password: hashedPassword,
        });

        const savedSchool = await newSchool.save();

        res.status(201).json({
          success: true,
          data: {
            id: savedSchool._id,
            school_name: savedSchool.school_name,
            email: savedSchool.email,
            image_url: savedSchool.school_image,
          },
          message: "School registered successfully",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error registering school",
          error: error.message,
        });
      }
    });
  },
  loginSchool: async (req, res) => {
    try {
      const school = await schoolModel.findOne({ email: req.body.email });
      if (!school) {
        return res
          .status(404)
          .json({ success: false, message: "School not found" });
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        school.password
      );
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      } else {
        const jwtsecret = process.env.JWT_SECRET;
        const token = jwt.sign(
          {
            id: school._id,
            schoolId: school._id,
            school_name: school.school_name,
            owner_name: school.owner_name,
            image_url: school.image_url,
            role: "school",
          },
          jwtsecret
        );
        res.header("Authorization", token);
        //TODO: We need to generate a token for the user upon successful login(each time the user logs in) and send it to the client.
        //TODO: Additionally, we should store the token in the database for future reference.
        //TODO: The response will include the following user data:
        res.status(200).json({
          success: true,
          message: "School logged in successfully",
          user: {
            id: school._id,
            school_name: school.school_name,
            owner_name: school.owner_name,
            image_url: school.image_url,
            role: "school",
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while logging in",
        error: error.message,
      });
    }
  },
  getAllSchools: async (req, res) => {
    try {
      //this school data will be visible to all the users evn if the user is not logged in
      const schools = await schoolModel
        .find()
        .select("-password", "-_id", "-email", "-owner_name", "-createAt");
      res.status(200).json({
        success: true,
        data: schools,
        message: "all Schools fetched successfully",
        schools,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "An error occurred while fetching schools[ ALL SCHOOL DATA ]. ",
        error: error.message,
      });
    }
  },
  getSchoolOwnData: async (req, res) => {
    try {
      const id = req.user.id;
      const school = await schoolModel.findOne({ _id: id });
      if (!school) {
        return res
          .status(404)
          .json({ success: false, message: "School not found" });
      } else {
        res.status(200).json({
          success: true,
          data: school,
          message: "School data fetched successfully",
          school,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching school[ OWN SCHOOL DATA ]. ",
        error: error.message,
      });
    }
  },
  updateSchool: async (req, res) => {
    try {
      // This line creates a new instance of the 'formidable.IncomingForm' class.
      const form = new formidable.IncomingForm();
      const id = req.user.id; // this we will get while authenticating the user
      // This line parses the incoming request and saves the form data and uploaded files to the 'fields' and 'files' variables.
      form.parse(req, async (err, fields, files) => {
        if (err) {
          // This line sends a response with a status code of 400 and an error message if there was an error parsing the files.
          return res.status(400).send("Error parsing the files");
        }

        const school = await schoolModel.findOne({ _id: id });
        if (files.image) {
          // This line gets the first uploaded file from the 'files' object.
          const photo = files.image[0];

          // This line gets the file path of the uploaded file.
          let filepath = photo.filepath;

          // This line replaces any spaces in the original file name with underscores.
          let originalFilename = photo.originalFilename.replace(" ", "_");
          if (school.school_image) {
            let oldImagepath = path.join(
              __dirname,
              process.env.SCHOOL_IMAGE_PATH,
              school.school_image
            );
            if (fs.existsSync(oldImagepath)) {
              fs.unlinkSync(oldImagepath, (err) => {
                if (err) {
                  console.log("error deleting old image");
                }
              });
            }
          }
          // This line creates a new file path using the current directory, the 'SCHOOL_IMAGE_PATH' environment variable, and the original file name.
          let newpath = path.join(
            __dirname,
            process.env.SCHOOL_IMAGE_PATH,
            originalFilename
          );

          // This line reads the contents of the uploaded file and saves it to the new file path.
          let photoData = fs.readFileSync(filepath);
          fs.writeFileSync(newpath, photoData);
          Object.keys(fields).forEach((field) => {
            school[field] = fields[field][0];
          });
          await school.save();
          res.status(200).json({
            success: true,
            message: "School updated successfully",
            school,
          });
        }
      });
    } catch (error) {
      // This line sends a response with a status code of 500 and an error message if there was an error registering the school.
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the school",
        error: error.message,
      });
    }
  },
};
