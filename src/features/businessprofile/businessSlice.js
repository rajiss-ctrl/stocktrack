import { createSlice} from "@reduxjs/toolkit";


const initialState = {
  buzProfileData: [] ,
  isLoading:true
  }

const businessProSlice = createSlice({
  name: 'buz',
  initialState : initialState,
  reducers :{
    fetchBuzData:(state,action)=>{
      state.buzProfileData = action.payload
    }
  }
})
// console.log(productSlice)

export const {fetchBuzData} = businessProSlice.actions;
export default businessProSlice.reducer;
