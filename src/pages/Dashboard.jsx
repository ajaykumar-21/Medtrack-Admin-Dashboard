import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDevices,
  deleteDeviceById,
} from "../features/devices/deviceSlice";
import AddDeviceForm from "../components/AddDeviceForm";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    items: devices,
    status,
    error,
  } = useSelector((state) => state.devices);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllDevices());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete device ${id}?`
    );
    if (confirm) {
      dispatch(deleteDeviceById(id));
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Device Inventory
      </Typography>

      <AddDeviceForm editingId={editingId} setEditingId={setEditingId} />

      {status === "loading" && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {status === "failed" && <p>Error: {error}</p>}

      {status === "succeeded" && devices.length === 0 && (
        <p>No devices found. Try adding some using the form above.</p>
      )}

      {status === "succeeded" && devices.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Facility</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Battery %</TableCell>
                <TableCell>Last Service</TableCell>
                <TableCell>Install Date</TableCell>
                <TableCell>Contract</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.id}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.facility}</TableCell>
                  <TableCell>{device.status}</TableCell>
                  <TableCell>{device.battery}%</TableCell>
                  <TableCell>{device.lastServiceDate}</TableCell>
                  <TableCell>{device.installDate}</TableCell>
                  <TableCell>{device.contractType}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditingId(device.id)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(device.id)}
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;
