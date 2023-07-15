import globalReducer from "state";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
       global: globalReducer
    }
})

export default store