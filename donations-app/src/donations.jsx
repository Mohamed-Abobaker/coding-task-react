import React, { useState } from "react";

const Donations = ({ donations }) => {
  const [filterState, setFilterState] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setFilterState(e.target.value);
  };

  let donationsArr = [...donations];

  if (filterState && filterState !== "false")
    donationsArr = donationsArr.filter(({ status }) => {
      if (filterState === "Active") return status.name === "Active";
      return status.name !== "Active";
    });

  return (
    <div>
      Donations
      <div>
        <select name="Location" onChange={handleChange} required>
          {["Select filter...", "Active", "Non Active"].map((e, i) => {
            return (
              <option key={e} value={i ? e : false}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
      {donationsArr.map((donation) => {
        return (
          <div
            key={donation.id}
            style={{ padding: 10, margin: "10%", border: "1px solid black", borderRadius: 25 }}
          >
            {Object.keys(donation).map((e) => {
              if (["location", "theme", "status", "reference", "price"].includes(e)) {
                return (
                  <p key={donation.id + e}>
                    {e}: {donation[e]?.name || donation[e]?.text || "Not provided!"}
                  </p>
                );
              }
              return (
                <p key={donation.id + e}>
                  {e}: {donation[e] || "Not provided"}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Donations;
