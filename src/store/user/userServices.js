import { base_url } from "../../api/axiosConfig";
import axios from "axios";

// const getTokenFromLocalStorage = localStorage.getItem("admin")
//   ? JSON.parse(localStorage.getItem("admin"))
//   : null;


const getAllUsers = async () => {
  const response = await axios.get(`${base_url}/customers`);
 
  return response.data;
};

const deleteUser = async (id) => {
   const response =   await axios.delete(`${base_url}/customers/${id}`);
   return response.data;
 };
 
 const edituser = async (data) => {
   console.log(data)
   const response = await axios.put(`${base_url}/customers/${data.id}`, data.data);
   return response.data;
 };
 
 const userService={
  getAllUsers,
  deleteUser,
   edituser,
 }
 export default userService;