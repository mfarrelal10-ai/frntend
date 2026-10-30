import axios from 'axios'
import { data } from "react-router-dom";

const API_URL = 'http://103.247.10.59:3000/api/movies';

export const getAllMovies = () =>{
    return axios.get(API_URL);
}
export const getMovieById = (id)=> {
    return axios.get(`${API_URL}/${id}`)
}
export const createMovie = (data)=> {
    return axios.post(API_URL, data);
}
export const updateMovie = (id, data)=> {
    return axios.put(`${API_URL}/${id}`, data);
}
export const deleteMovie = (id)=> {
    return axios.delete(`${API_URL}/${id}`)
}