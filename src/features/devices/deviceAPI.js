const BASE_URL = "http://localhost:5000/devices";

// Fetch all devices
export const fetchDevices = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch devices");
  return response.json();
};

// Add new device
export const addDevice = async (device) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(device),
  });
  return response.json();
};

// Update device by ID
export const updateDevice = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

// Delete device by ID
export const deleteDevice = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return response;
};
