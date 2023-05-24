import axios from "axios";

const getBuoyData = async (id) => {
  return await axios.get(`https://api.odn-it.com/devices/${id}/`);
};

const getOxygenData = async (id) => {
  return await axios.get(`https://api.odn-it.com/devices/${id}/oxygens/`);
};
