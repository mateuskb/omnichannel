import axios from "axios";

const getAddressFromZipCode = async (zipCode: string) => {
  const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  return response.data;
}

export {
  getAddressFromZipCode
}