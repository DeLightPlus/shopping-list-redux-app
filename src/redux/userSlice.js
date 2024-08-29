import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signInUser = createAsyncThunk(
  'user/signIn',
  async (credentials, thunkAPI) => {
    try 
    {
        console.log('cred:', credentials);        
        const response = await axios.get('http://localhost:8000/users');
        console.log(response);
        
        if(response.status === 200)
        {
            const user = response.data.find(
                (user) => user.email === credentials.email 
                && user.password === credentials.password )
            
            if(user)
                return { id: user.id, username: user.username, signedIn: true } 
            else
                alert('user not found!!')
        }
        else{ alert('error fetching users'); return null }       
    } 
    catch (error) {  return thunkAPI.rejectWithValue(error.message);  }
  }
);


const initialState = {
    id:null,
    username: null,
    signedIn: false  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {  
    signIn: (state, action) => {
        console.log('signin.action', action);
        
        state.id = action.payload.id
        state.username = action.payload.username;
        state.signedIn = true;
      },

    signOut: (state) => {
        state.id = null;
        state.username = '';     
        state.signedIn = false;  
        sessionStorage.removeItem('user')
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;      
        state.signedIn = true;  

        console.log('signinuser.action.payload|extra', action.payload);
        sessionStorage.setItem('user', JSON.stringify(action.payload)); 
    });

    builder.addCase(signInUser.rejected, (state, action) => {  
      state.id = null;
      state.user = null;
      state.signedIn = false;
    });
  },
});

export const { signIn, signOut } = userSlice.actions;