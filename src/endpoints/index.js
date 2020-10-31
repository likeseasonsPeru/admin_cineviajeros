import { API_URL, TOKEN_API_GET } from '../utils/config'

export const login = async (email, password) => {
    try{
      let data = {
        email,
        password
      }
      let response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(response => response.json()); 
      return response;  
    }catch(error){
      return  error
    }
}

export const getPeliculas = async () => {
  try{
    let data =  await fetch(`${API_URL}/allpeliculas`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const getPelicula = async (id) => {
  try{
    let data =  await fetch(`${API_URL}/peliculas/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const getBanners = async () => {
  try{
    let data =  await fetch(`${API_URL}/banners`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const getPromotions = async () => {
  try{
    let data =  await fetch(`${API_URL}/promotions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const getCombos = async () => {
  try{
    let data =  await fetch(`${API_URL}/combos`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}
