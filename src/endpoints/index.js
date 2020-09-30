import { API_URL } from '../utils/config'

export const login = async (email, password) => {
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
  }
