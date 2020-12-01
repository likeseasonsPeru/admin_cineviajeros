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

/* PELICULAS - REQUESTS*/
export const getPeliculas = async () => {
  try{
    let data =  await fetch(`${API_URL}/allpeliculas`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data.reverse();
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

export const createPelicula = async (token,pelicula) => {
  try{
    let dataToSend = new FormData();
    Object.keys(pelicula).forEach(key => {
      if (pelicula[key]) {
        dataToSend.append(key, pelicula[key]);
      }
    });
    let data =  await fetch(`${API_URL}/peliculas`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const editPelicula = async (token,id,pelicula) => {
  try{
    let dataToSend = new FormData();
    Object.keys(pelicula).forEach(key => {
      if (pelicula[key]) {
        dataToSend.append(key, pelicula[key]);
      }
    });

    let data =  await fetch(`${API_URL}/peliculas/${id}?_method=PUT`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const deletePelicula = async (token,id) => {
  try{
    let data =  await fetch(`${API_URL}/peliculas/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

//BANNERS - REQUESTS

export const getBanners = async () => {
  try{
    let data =  await fetch(`${API_URL}/banners`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data.reverse();
  }catch(error){
    return error
  } 
}

export const getBanner = async (id) => {
  try{
    let data =  await fetch(`${API_URL}/banners/${id}`, {
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

export const createBanner = async (token,banner) => {
  try{
    let dataToSend = new FormData();
    Object.keys(banner).forEach(key => {
      if (banner[key]) {
        dataToSend.append(key, banner[key]);
      }
    });
    let data =  await fetch(`${API_URL}/banners`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const editBanner = async (token,id,banner) => {
  try{
    let dataToSend = new FormData();
    Object.keys(banner).forEach(key => {
      if (banner[key]) {
        dataToSend.append(key, banner[key]);
      }
    });

    let data =  await fetch(`${API_URL}/banners/${id}?_method=PUT`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const deleteBanner = async (token,id) => {
  try{
    let data =  await fetch(`${API_URL}/banners/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}


//PROMOTIONS - REQUESTS

export const getPromotions = async () => {
  try{
    let data =  await fetch(`${API_URL}/promotions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data.reverse();
  }catch(error){
    return error
  } 
}

export const getPromotion = async (id) => {
  try{
    let data =  await fetch(`${API_URL}/promotions/${id}`, {
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

export const createPromotion = async (token,promotion) => {
console.log("promotion", promotion)
  try{
    let dataToSend = new FormData();
    
    Object.keys(promotion).forEach(key => {
      if (promotion[key]) {
        dataToSend.append(key, promotion[key]);
      }
    });
    console.log("dataToSend", dataToSend)
    let data =  await fetch(`${API_URL}/promotions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const editPromotion = async (token,id,promotion) => {
  try{
    let dataToSend = new FormData();
    Object.keys(promotion).forEach(key => {
      if (promotion[key]) {
        dataToSend.append(key, promotion[key]);
      }
    });
    let data =  await fetch(`${API_URL}/promotions/${id}?_method=PUT`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const deletePromotion = async (token,id) => {
  try{
    let data =  await fetch(`${API_URL}/promotions/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

//COMBOS - REQUESTS

export const getCombos = async () => {
  try{
    let data =  await fetch(`${API_URL}/combos`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Authorization': TOKEN_API_GET,
      },
    }).then(response => response.json());
    return data.reverse();
  }catch(error){
    return error
  } 
}

export const getCombo = async (id) => {
  try{
    let data =  await fetch(`${API_URL}/combos/${id}`, {
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

export const createCombo = async (token,combo) => {
  try{
    let dataToSend = new FormData();
    
    Object.keys(combo).forEach(key => {
      if (combo[key]) {
        dataToSend.append(key, combo[key]);
      }
    });
    let data =  await fetch(`${API_URL}/combos`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const editCombo = async (token,id,combo) => {
  try{
    let dataToSend = new FormData();
    
    Object.keys(combo).forEach(key => {
      if (combo[key]) {
        dataToSend.append(key, combo[key]);
      }
    });
    let data =  await fetch(`${API_URL}/combos/${id}?_method=PUT`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const deleteCombo = async (token,id) => {
  try{
    let data =  await fetch(`${API_URL}/combos/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}


//HORARIOS - REQUESTS

export const createHorario = async (token,horario) => {
  try{
    let dataToSend = new FormData();
    
    Object.keys(horario).forEach(key => {
      if (horario[key]) {
        dataToSend.append(key, horario[key]);
      }
    });
    let data =  await fetch(`${API_URL}/horarios`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:dataToSend
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const editHorario = async (token,idHorario,horario) => {
  try{
    let dataToSend = new FormData();
    
    Object.keys(horario).forEach(key => {
      if (horario[key]) {
        dataToSend.append(key, horario[key]);
      }
    });

    let data =  await fetch(`${API_URL}/horarios/${idHorario}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:JSON.stringify(horario)
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const deleteHorario = async (token,id) => {
  try{
    let data =  await fetch(`${API_URL}/horarios/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json());
    return data;
  }catch(error){
    return error
  } 
}

export const exportEmailToExcel =  () => {
  try{
    let data =  fetch(`${API_URL}/subscriptions`, {
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

