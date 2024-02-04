import { API_BASE_URL, COOKIE_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import Cookies from "js-cookie";

export const fileUpload = async (file) => {
  const token = Cookies.get(COOKIE_TOKEN_KEY);

  try {
    const formData = new FormData();
    formData.append("file", file);
    const headers = { Authorization: `Bearer ${token}` };
    const result = await axios.post(`${API_BASE_URL}/files/`, formData, {
      headers,
    });
    return result.data;
  } catch (err) {
    console.error("Error while loggin in: Stacktrace: ", err);
  }
};

export const getAllFiles = async () => {
  const token = Cookies.get(COOKIE_TOKEN_KEY);

  try {
    const result = await axios.get(`${API_BASE_URL}/files/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (err) {
    console.error("Error while loggin in: Stacktrace: ", err);
  }
};

export const removeFile = async (fileId) => {
  const token = Cookies.get(COOKIE_TOKEN_KEY);

  try {
    const result = await axios.post(`${API_BASE_URL}/files/${fileId}/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (err) {
    console.error("Error while loggin in: Stacktrace: ", err);
  }
};

export const downloadFile = async (fileDetails) => {
  const token = Cookies.get(COOKIE_TOKEN_KEY);

  try {
    const result = await axios.post(
      `${API_BASE_URL}/files/download`,
      fileDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result.data;
  } catch (err) {
    console.error("Error while loggin in: Stacktrace: ", err);
  }
};
