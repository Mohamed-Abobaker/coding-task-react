import React, { useState } from "react";

const AddDonation = ({ themes, locations, baseUrl, donations }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Location: "",
    Theme: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const donationNames = donations.map((e) => e.name);
    if (donationNames.includes(formData.Name)) {
      alert("This donation name already exists. Please select a unique name");
      setFormData({ ...formData, Name: "" });
    } else {
      fetch(`${baseUrl}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "Price") {
      setFormData({
        ...formData,
        Price: { currencyCode: "GBP", amount: Number(e.target.value) },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div style={{ margin: "5%" }}>
      New Donation
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            required={true}
            minLength={1}
            maxLength={200}
            name="Name"
            onChange={handleChange}
            value={formData["Name"]}
          />
        </label>
        <label>
          Location
          <select name="Location" onChange={handleChange} required>
            <option value="" disabled selected>
              Select location
            </option>
            {locations.map((e) => {
              return (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Theme
          <select name="Theme" onChange={handleChange} required>
            <option value="" disabled selected>
              Select theme
            </option>
            {themes.map((e) => {
              return (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Price £
          <input min={0.01} step="0.01" name="Price" type="number" onChange={handleChange} />
          (GBP)
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default AddDonation;
