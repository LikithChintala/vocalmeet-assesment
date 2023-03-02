import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
  Grid,
  FormLabel,
} from "@mui/material";

export const FormValidator = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    postcode: "",
    description: "",
    tshirtSize: "",
    tshirtColor: "",
    acceptCondition: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "phone") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.replace(/[^\d]/g, ""),
      }));
      let phoneNumber = value.replace(/[^\d]/g, "");
      const phoneNumberLength = phoneNumber.length;
      if (phoneNumberLength < 4) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: phoneNumber,
        }));
      }
      if (phoneNumberLength < 7) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
            3,
            6
          )}`,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
            3,
            6
          )}-${phoneNumber.substring(6, phoneNumber.length)}`,
        }));
      }
    } else if (name === "postcode") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.replaceAll(" ", "").toUpperCase(),
      }));
      let postCode = value.replaceAll(" ", "");
      const postCodeLength = value.length;
      if (postCodeLength < 4) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: postCode.toUpperCase(),
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: `${postCode.substring(0, 3).toUpperCase()} ${postCode
            .substring(3, postCode.length)
            .toUpperCase()}`,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "acceptCondition" ? checked : value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.firstName.trim() === "") {
      newErrors.firstName = "Please enter your first name";
    }
    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Please enter your last name";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (formData.phone.replace(/[^\d]/g, "").trim() === "") {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone =
        "Invalid phone number. Please use the format (xxx) xxx-xxxx";
    }
    if (formData.age.trim() === "") {
      newErrors.age = "Please enter your age";
    } else if (formData.age < 16 || formData.age > 65) {
      newErrors.age = "Your age must be between 16 and 65";
    }
    if (formData.postcode.replace(" ", "").trim() === "") {
      newErrors.postcode = "Please enter your postcode";
    } else if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(formData.postcode)) {
      newErrors.postcode = "Invalid postcode. Please use the format X0X 0X0";
    }
    if (
      formData.description.trim() === "" ||
      formData.description.length < 150
    ) {
      newErrors.description =
        "Please enter a description with at least 150 characters";
    }
    if (formData.tshirtSize.trim() === "") {
      newErrors.tshirtSize = "Please select your t-shirt size";
    }
    if (formData.tshirtColor.trim() === "") {
      newErrors.tshirtColor = "Please select your t-shirt Color";
    }
    if (formData.acceptCondition === false) {
      newErrors.acceptCondition = "Please accept the condition";
    }
    setErrors(newErrors);
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      postcode: "",
      description: "",
      tshirtSize: "",
      tshirtColor: "",
      acceptCondition: false,
    });
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={2}
        >
          <Grid item xs={3} md={3}>
            <TextField
              label="First Name *"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <TextField
              label="Middle Name"
              fullWidth
              name="middleName"
              placeholder="Enter your middle name"
              value={formData.middleName}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <TextField
              label="Last Name *"
              fullWidth
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={2}
        >
          <Grid item xs={3} md={3}>
            <TextField
              fullWidth
              label="Email *"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <TextField
              label="Phone *"
              name="phone"
              fullWidth
              type="tel"
              placeholder="(xxx) xxx-xxxx"
              value={formData.phone}
              onChange={handleInputChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <TextField
              label="Age *"
              fullWidth
              name="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleInputChange}
              error={Boolean(errors.age)}
              helperText={errors.age}
              InputProps={{
                inputProps: { min: 16, max: 65 },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={2}
        >
          <Grid item xs={3} md={3}>
            <TextField
              label="Postcode *"
              name="postcode"
              fullWidth
              placeholder="X0X 0X0"
              value={formData.postcode}
              onChange={handleInputChange}
              error={Boolean(errors.postcode)}
              helperText={errors.postcode}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={3} md={3}>
            <FormControl
              variant="standard"
              fullWidth
              error={Boolean(errors.tshirtSize)}
            >
              <InputLabel id="demo-simple-select-standard-label">
                T-Shirt Size *
              </InputLabel>
              <Select
                labelId="tshirt-size-label"
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleInputChange}
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </Select>
              {Boolean(errors.tshirtSize) && (
                <FormHelperText>{errors.tshirtSize}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}></Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={2}
        >
          <Grid item xs={6} md={9}>
            <FormControl error={Boolean(errors.tshirtColor)}>
              <FormLabel>T-shirt Color *</FormLabel>

              <RadioGroup
                row
                aria-label="tshirt-colour"
                name="tshirtColor"
                value={formData.tshirtColor}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="White"
                  control={<Radio />}
                  label="White"
                />
                <FormControlLabel
                  value="Black"
                  control={<Radio />}
                  label="Black"
                />
                <FormControlLabel
                  value="Orange"
                  control={<Radio />}
                  label="Orange"
                />
                <FormControlLabel
                  value="Blue"
                  control={<Radio />}
                  label="Blue"
                />
                <FormControlLabel value="Red" control={<Radio />} label="Red" />
              </RadioGroup>

              {Boolean(errors.tshirtColor) && (
                <FormHelperText>{errors.tshirtColor}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={2}
        >
          <Grid item xs={6} md={9}>
            <TextField
              id="standard-multiline-static"
              label="Description *"
              multiline
              rows={4}
              fullWidth
              variant="standard"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={2}
        >
          <Grid item xs={3} md={3}>
            <FormControl error={Boolean(errors.acceptCondition)}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.acceptCondition}
                    onChange={handleInputChange}
                    name="acceptCondition"
                    color="primary"
                    // required
                  />
                }
                label="I accept the terms and conditions"
              />
              {Boolean(errors.acceptCondition) && (
                <FormHelperText>{errors.acceptCondition}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          p={2}
        >
          <Grid item xs={6} md={6}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ margin: "auto", display: "flex" }}
            >
              Validate
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearForm}
              sx={{ margin: "auto", display: "flex" }}
            >
              Clear Form
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
