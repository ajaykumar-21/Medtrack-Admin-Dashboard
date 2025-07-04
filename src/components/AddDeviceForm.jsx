import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewDevice,
  updateDeviceById,
} from "../features/devices/deviceSlice";

const statusOptions = ["Online", "Offline", "Maintenance"];

const AddDeviceForm = ({ editingId, setEditingId }) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.items);

  const [formData, setFormData] = useState({
    id: "",
    type: "",
    facility: "",
    status: "Online",
    battery: "",
    lastServiceDate: "",
    installDate: "",
    contractType: "AMC",
    photo: "",
  });

  const [errors, setErrors] = useState({});

  // Load data into form if editing
  useEffect(() => {
    if (editingId) {
      const deviceToEdit = devices.find((d) => d.id === editingId);
      if (deviceToEdit) {
        setFormData(deviceToEdit);
      }
    }
  }, [editingId, devices]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file?.name || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.id) newErrors.id = "ID is required";
    if (!formData.type) newErrors.type = "Device type is required";
    if (!formData.facility) newErrors.facility = "Facility name is required";
    if (!formData.battery || isNaN(formData.battery))
      newErrors.battery = "Enter a valid battery %";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      dispatch(updateDeviceById({ id: editingId, updatedData: formData }));
    } else {
      dispatch(addNewDevice(formData));
    }

    // Reset form
    setFormData({
      id: "",
      type: "",
      facility: "",
      status: "Online",
      battery: "",
      lastServiceDate: "",
      installDate: "",
      contractType: "AMC",
      photo: "",
    });
    setEditingId(null);
    setErrors({});
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {editingId ? `Edit Device (${editingId})` : "Add New Device"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Device ID"
              name="id"
              value={formData.id}
              onChange={handleChange}
              fullWidth
              error={!!errors.id}
              helperText={errors.id}
              disabled={!!editingId} // Don't allow changing ID when editing
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Device Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              error={!!errors.type}
              helperText={errors.type}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Facility Name"
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              fullWidth
              error={!!errors.facility}
              helperText={errors.facility}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
              {statusOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Battery %"
              name="battery"
              value={formData.battery}
              onChange={handleChange}
              fullWidth
              error={!!errors.battery}
              helperText={errors.battery}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Service Date"
              name="lastServiceDate"
              type="date"
              value={formData.lastServiceDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Installation Date"
              name="installDate"
              type="date"
              value={formData.installDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Contract Type"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="file"
              name="photo"
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained">
                {editingId ? "Update Device" : "Add Device"}
              </Button>
              {editingId && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setEditingId(null)}
                >
                  Cancel Edit
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddDeviceForm;
