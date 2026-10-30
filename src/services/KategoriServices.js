import axios from "axios";
import { data } from "react-router-dom";

const API_URL = 'http://103.247.10.59:3000/api/categories'

export const getAllCategories = ()=>{
    return axios.get(API_URL);
}

export const getCategoriesById = (id)=>{
    return axios.get(`${API_URL}/${id}`)
}

export const createCategories = (data)=>{
    return axios.post (API_URL, data)
}

export const updateCategories = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
}

export const deleteCategories = (id)=>{
    return axios.delete(`${API_URL}/${id}`)
}