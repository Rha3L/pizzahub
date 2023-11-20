/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress, getPosition } from "../../services/apiGeocoding";
import { Status, UserState } from "../../types";
import { RootState } from "../../store/store";

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  }
);

const initialState: UserState = {
  username: "",
  status: Status.idle,
  position: { latitude: undefined, longitude: undefined },
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, _action) => {
        state.status = Status.loading;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = Status.idle;
      })
      .addCase(fetchAddress.rejected, (state, _action) => {
        state.status = Status.error;
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user;

export const getUsername = (state: RootState) => state.user.username;
