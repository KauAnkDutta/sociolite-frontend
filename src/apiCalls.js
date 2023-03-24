import axios from "axios";
import {toast} from 'react-toastify';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    await axios.post(`https://api-sociolite.onrender.com/api/userLogin`, userCredential)
    .then(res => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("Login Successful");
      window.location.reload();
    })
    
  } catch (error) {
    toast.error(error.response.data.msg);
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const get_friends_suggestion = async (user, dispatch) => {
  try {
    if (user) {
      const all_users = await axios.get(`https://api-sociolite.onrender.com/api/getAllUsers/${user?._id}`);

      if (all_users.data) {
        dispatch({
          type: "SHOWSUGGESTIONS",
          payload: all_users.data,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

