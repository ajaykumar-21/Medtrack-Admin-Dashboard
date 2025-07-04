import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDevices } from "../features/devices/deviceSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    items: devices,
    status,
    error,
  } = useSelector((state) => state.devices);

  useEffect(() => {
    dispatch(fetchAllDevices());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Device Inventory
      </Typography>

      {status === "loading" && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {status === "failed" && <p>Error: {error}</p>}

      {status === "succeeded" && devices.length === 0 && (
        <p>No devices found. Try adding some using the form.</p>
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
                <TableCell>Last Install</TableCell>
                <TableCell>AMC/CMC</TableCell>
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
