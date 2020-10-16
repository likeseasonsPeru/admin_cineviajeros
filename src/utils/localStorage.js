import Cookies from 'universal-cookie'; 
const cookies = new Cookies();
export const loadState = () => {
    try{
        const serializedState = cookies.get('state');
        if(serializedState === null){
            return undefined
        }
        return serializedState
    }catch(error){
        return undefined
    }
}

export const saveState = async (state) => {
    try{
        cookies.set('state', state)
    }catch(error){
        return
    }
}

export const removeState = async () => {
    try{
        cookies.remove('state')
    }catch(error){
        return
    }
}
    