import axios from "axios"

export const borrow = (data) =>
{
  return axios
  .post("http://localhost:5555/api/bank/borrow", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
  .then((res) => {
    return {code:res.status,message:res.data.message}})
  .catch((err)=>{
    return {code:err.response.status,message:err.response.data.message}
  })
}

export const transfer = (data) =>
{
  return axios
  .post("http://localhost:5555/api/bank/transfer", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
  .then((res) => {
      return {code:res.status,message:res.data.message}})
  .catch((err)=>{
    return {code:err.response.status,message:err.response.data.message}
  })
}


export const loan = (data) => {
  return axios
  .post("http://localhost:5555/api/bank/loan", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
  .then((res) => {
    return {code:res.status,message:res.data.message}})
  .catch((err)=>{
    return {code:err.response.status,message:err.response.data.message}
})
}
      
export const refund = (data) =>
{
  return axios
  .post("http://localhost:5555/api/bank/refund", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
  .then((res) => {
       return res.data})
}

export const markAllAsRead = (data) =>
{
  return axios
  .post("http://localhost:5555/api/bank/markAllAsRead", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
  .then((res) => {
       return res.data})
}
