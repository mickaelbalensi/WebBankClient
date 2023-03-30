import axios from "axios"

export const getinfo =  async (data) =>
{ 
  return await axios
  .post("http://localhost:5555/api/user/getinfo", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
  .then((res) => {
      // console.log('res data',res.data);
      return res.data})
  .catch((err)=>{
    console.log('err:',err);
  })
}

export const updateUser = (data) =>
{
    return axios
    .post("http://localhost:5555/api/user/updateprofile", data, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
    .then((res) => {
        return res.data})
}

export const bankInfo =  async () =>
{ 
  return await axios
  .get("http://localhost:5555/api/user/bankinfo",{
    headers:{
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
  .then((res) => {
      console.log('res data',res.data);
      return res.data})
  .catch((err)=>{
    console.log('err:',err);
  })
}
