import { useFormik } from "formik";
import * as yup from "yup";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const registerSchema = yup.object().shape({
  school_name: yup.string().required("School name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  owner_name: yup.string().required("Owner name is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  school_image: yup
    .mixed()
    .required("School image is required")
    .test(
      "fileType",
      "Only image files are accepted",
      (value) =>
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    ),
});

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [submissionError, setSubmissionError] = React.useState("");
  const [submissionSuccess, setSubmissionSuccess] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
      formik.setFieldValue("school_image", file);
    }
  };

  const handleClearFile = () => {
    fileInputRef.current.value = null;
    setImageUrl(null);
    setFile(null);
    formik.setFieldValue("school_image", null);
    formik.setFieldTouched("school_image", true);
  };

  const formik = useFormik({
    initialValues: {
      school_name: "",
      email: "",
      owner_name: "",
      password: "",
      confirm_password: "",
      school_image: null,
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmissionError("");
      setSubmissionSuccess(false);

      try {
        const formData = new FormData();
        formData.append("school_name", values.school_name);
        formData.append("email", values.email);
        formData.append("owner_name", values.owner_name);
        formData.append("password", values.password);
        formData.append("image", file, file.name);

        const response = await axios.post(
          "http://localhost:5001/api/school/register",
          formData
        );
        console.log(response);

        setSubmissionSuccess(true);
        resetForm();
        handleClearFile();
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setSubmissionError(error.message || "An unexpected error occurred");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #1976d2",
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          align="center"
          sx={{
            mb: 3,
            color: "primary.main",
            fontWeight: 600,
            fontSize: "1.5rem",
            letterSpacing: 0.5,
          }}
        >
          School Registration
        </Typography>

        {submissionError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submissionError}
          </Alert>
        )}

        {submissionSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! Redirecting to login...
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{
                  width: "100%",
                  py: 2,
                  borderStyle: "dashed",
                  backgroundColor: "action.hover",
                }}
              >
                Upload School Image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={addImage}
                />
              </Button>
              {formik.touched.school_image && formik.errors.school_image && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {formik.errors.school_image}
                </Typography>
              )}
            </Box>
          </Grid>

          {imageUrl && (
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <IconButton
                  aria-label="remove image"
                  onClick={handleClearFile}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                >
                  <CancelIcon />
                </IconButton>
                <CardMedia
                  component="img"
                  image={imageUrl}
                  alt="School preview"
                  sx={{
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            size="small"
            fullWidth
            id="school_name"
            name="school_name"
            label="School Name"
            value={formik.values.school_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.school_name && Boolean(formik.errors.school_name)
            }
            helperText={formik.touched.school_name && formik.errors.school_name}
          />

          <TextField
            size="small"
            fullWidth
            id="owner_name"
            name="owner_name"
            label="Owner's Name"
            value={formik.values.owner_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.owner_name && Boolean(formik.errors.owner_name)
            }
            helperText={formik.touched.owner_name && formik.errors.owner_name}
          />

          <TextField
            size="small"
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            size="small"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            size="small"
            fullWidth
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
          />

          <Button
            fullWidth
            variant="contained"
            size="medium"
            type="submit"
            disabled={formik.isSubmitting}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "0.9rem",
              fontWeight: 600,
              transition: "transform 0.2s",
              background: "linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 3,
              },
            }}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Create Account"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
