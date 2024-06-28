import axios from "axios";
import { API_KEY } from "@/config/config";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = async (data) => {
  try {
    const response = await axiosInstance.post("/user-resumes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating new resume:", error);
  }
};

const getResumes = async (user_email) => {
  try {
    const response = await axiosInstance.get("/user-resumes?filters[user_email][$eq]="+user_email);
    return response.data;
  } catch (error) {
    console.error("Error getting resumes:", error);
  }
};
export { createNewResume, getResumes };
