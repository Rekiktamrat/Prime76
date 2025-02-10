import { base_url, config } from "../../../api/axiosConfig";
import axios from "axios";


const addLocation = async (data) => {
  
  const response = await axios.post(`${base_url}/locations`, data);
  return response.data;
};

const getAllLocations = async () => {
  const response = await axios.get(`${base_url}/locations`);
  return response.data;
};

const updateLocation = async (data) => {
  
  const response = await axios.put(
    `${base_url}/locations/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteLocation = async (id) => {
  
  const response = await axios.delete(`${base_url}/locations${id}`);
  return response.data;
};

const deleteAllLocations = async () => {
  
  const response = await axios.delete(`${base_url}/region/delete-all`);
  return response.data;
};

const locationService = {
  addLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
  deleteAllLocations,
};

export default locationService;