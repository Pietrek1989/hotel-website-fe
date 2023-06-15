import axios from "axios";
import {
  getAllEarnings,
  getAllInfoReservations,
  getAllReservationsCount,
  getAllUsers,
  getThisMonthEearnings,
  getThisMonthReservationsCount,
} from "../../../redux/actions";
const apiUrl = process.env.REACT_APP_BE_URL;

export const fetchThisMonthEarnings = async (dispatch: any) => {
  const { data } = await axios.get(`${apiUrl}/reservations/earningsNow`);
  dispatch(getThisMonthEearnings(data.earnings));
};

export const fetchAllEarnings = async (dispatch: any) => {
  const { data } = await axios.get(`${apiUrl}/reservations/totalEarnings`);

  dispatch(getAllEarnings(data.totalEarnings));
};

export const fetchUsers = async (dispatch: any) => {
  const { data } = await axios.get(`${apiUrl}/users/count`);

  dispatch(getAllUsers(data));
};

export const fetchThisMonthReservationsCount = async (dispatch: any) => {
  const { data } = await axios.get(`${apiUrl}/reservations/countThisMonth`);

  dispatch(getThisMonthReservationsCount(data.count));
};
export const fetchAllReservationsCount = async (dispatch: any) => {
  const { data } = await axios.get(`${apiUrl}/reservations/countAll`);

  dispatch(getAllReservationsCount(data));
};

export const fetchAllInfoReservations = async (dispatch: any) => {
  const { data } = await axios.get(`${apiUrl}/reservations`);
  dispatch(getAllInfoReservations(data));
};

export const handleSave = async (args: any) => {
  const updatedReservation = args.data;
  try {
    const response = await axios.put(
      `${apiUrl}/${updatedReservation._id}`,
      updatedReservation
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
