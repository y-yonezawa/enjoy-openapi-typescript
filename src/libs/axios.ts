import axiosOriginal from 'axios'

export const axios = axiosOriginal.create({
  baseURL: 'http://localhost',
  withCredentials: true,
})
