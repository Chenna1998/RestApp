import { configureStore } from "@reduxjs/toolkit";
import employee from "../src/store/reducer/employee"; // Correct path

export default configureStore({
    reducer: { employee }
});
