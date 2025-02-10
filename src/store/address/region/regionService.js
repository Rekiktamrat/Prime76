import { base_url, config } from "../../../api/axiosConfig";
import axios from "axios";


const addRegion = async (data) => {
  
  const response = await axios.post(`${base_url}/regions`, data);
  return response.data;
};

const getAllRegions = async () => {
  const response = await axios.get(`${base_url}/regions`);
  return response.data;
};

const updateRegion = async (data) => {
  console.log(data)
  const response = await axios.put(
    `${base_url}/regions/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteRegion = async (id) => {
  
  const response = await axios.delete(`${base_url}/regions/${id}`);
  return response.data;
};

const deleteAllRegions = async () => {
  
  const response = await axios.delete(`${base_url}/region/delete-all`);
  return response.data;
};

const regionService = {
  addRegion,
  getAllRegions,
  updateRegion,
  deleteRegion,
  deleteAllRegions,
};

export default regionService;