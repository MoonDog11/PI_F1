import axios from "axios";

// Definición de la constante ITEMS_PER_PAGE
const ITEMS_PER_PAGE = 10;

// Definición de la función onPageChange
const onPageChange = (currentPage) => {
  // Lógica para manejar el cambio de página
  console.log("Página cambiada a:", currentPage);
};

// Action Types
export const FETCH_DRIVERS_REQUEST = "FETCH_DRIVERS_REQUEST";
export const FETCH_DRIVERS_SUCCESS = "FETCH_DRIVERS_SUCCESS";
export const FETCH_DRIVERS_FAILURE = "FETCH_DRIVERS_FAILURE";

export const CREATE_DRIVER_REQUEST = "CREATE_DRIVER_REQUEST";
export const CREATE_DRIVER_SUCCESS = "CREATE_DRIVER_SUCCESS";
export const CREATE_DRIVER_FAILURE = "CREATE_DRIVER_FAILURE";

export const CLEAR_SEARCH_ERROR = "CLEAR_SEARCH_ERROR";

export const GET_DRIVER_BY_ID = "GET_DRIVER_BY_ID";
export const GET_DRIVER_BY_ID_SUCCESS = "GET_DRIVER_BY_ID_SUCCESS";
export const GET_DRIVER_BY_ID_FAILURE = "GET_DRIVER_BY_ID_FAILURE";

export const SET_SELECTED_DRIVER = "SET_SELECTED_DRIVER";
export const SET_LOADING = "SET_LOADING";
export const TOGGLE_SORT_ORDER = "TOGGLE_SORT_ORDER";

export const SEARCH_DRIVER_BY_TEAM_REQUEST = "SEARCH_DRIVER_BY_TEAM_REQUEST";
export const SEARCH_DRIVER_BY_TEAM_SUCCESS = "SEARCH_DRIVER_BY_TEAM_SUCCESS";
export const SEARCH_DRIVER_BY_TEAM_FAILURE = "SEARCH_DRIVER_BY_TEAM_FAILURE";

export const SEARCH_DRIVER_BY_NAME_REQUEST = "SEARCH_DRIVER_BY_NAME_REQUEST";
export const SEARCH_DRIVER_BY_NAME_SUCCESS = "SEARCH_DRIVER_BY_NAME_SUCCESS";
export const SEARCH_DRIVER_BY_NAME_FAILURE = "SEARCH_DRIVER_BY_NAME_FAILURE";

export const RESET_DRIVERS = "RESET_DRIVERS";

// Acción para establecer el estado de carga
export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

// Acción para limpiar el error de búsqueda
export const clearSearchError = () => {
  return {
    type: CLEAR_SEARCH_ERROR,
  };
};

// Acción para manejar el éxito en la obtención de conductores
export const fetchDriversSuccess = (data) => {
  return async (dispatch) => {
    try {
      const teams = {};
      const allDrivers = [];
      const uniqueTeamSet = new Set();

      if (Array.isArray(data)) {
        data.forEach((driver) => {
          if (typeof driver.teams === "string") {
            const teamsList = driver.teams.split(",");
            teamsList.forEach((team) => {
              const teamName = team.trim() || "Unknown Team";
              if (!uniqueTeamSet.has(teamName)) {
                uniqueTeamSet.add(teamName);
                teams[teamName] = [];
              }
              teams[teamName].push(driver);
            });
          } else {
            const teamName = "Unknown Team";
            if (!uniqueTeamSet.has(teamName)) {
              uniqueTeamSet.add(teamName);
              teams[teamName] = [];
            }
            teams[teamName].push(driver);
          }
          allDrivers.push(driver);
        });
      }

      const uniqueTeamNames = Array.from(uniqueTeamSet);

      console.log("Equipos:", teams);

      dispatch({
        type: FETCH_DRIVERS_SUCCESS,
        payload: {
          drivers: allDrivers,
          teams: teams,
          teamNames: uniqueTeamNames,
        },
      });
    } catch (error) {
      console.error("Error en fetchDrivers:", error.message);
    }
  };
};

// Acción para manejar el fallo en la obtención de conductores
export const fetchDriversFailure = (error) => {
  return {
    type: FETCH_DRIVERS_FAILURE,
    payload: error,
  };
};

// Acción para obtener conductores
export const fetchDrivers = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        "https://pif1-production.up.railway.app/drivers"
      );

      console.log("API Response inside action:", response.data);

      if (!Array.isArray(response.data)) {
        throw new Error("API response is not an array");
      }

      dispatch(fetchDriversSuccess(response.data));
    } catch (error) {
      console.error("Error in fetchDrivers:", error.message);
      dispatch(fetchDriversFailure(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Acción para buscar conductores por nombre
export const searchDriverByName = (name) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_DRIVER_BY_NAME_REQUEST }); // Dispara la acción para indicar que se está realizando la solicitud de búsqueda

    try {
      // Realiza la solicitud para buscar conductores por nombre
      const url = `https://pif1-production.up.railway.app/drivers?name.forename=${encodeURIComponent(
        name
      )}`;
      const response = await axios.get(url);
      const data = response.data;

      // Si se encuentran conductores, dispara la acción para indicar el éxito de la búsqueda
      if (data.length > 0) {
        dispatch({
          type: SEARCH_DRIVER_BY_NAME_SUCCESS,
          payload: data,
        });
      } else {
        // Si no se encuentran conductores por nombre, intenta buscar por apellido
        const surnameUrl = `https://pif1-production.up.railway.app/drivers?name.surname=${encodeURIComponent(
          name
        )}`;
        const surnameResponse = await axios.get(surnameUrl);
        const surnameData = surnameResponse.data;

        // Si se encuentran conductores por apellido, dispara la acción para indicar el éxito de la búsqueda
        if (surnameData.length > 0) {
          dispatch({
            type: SEARCH_DRIVER_BY_NAME_SUCCESS,
            payload: surnameData,
          });
        } else {
          // Si no se encuentran conductores por apellido, dispara la acción para indicar que la búsqueda ha fallado
          dispatch({
            type: SEARCH_DRIVER_BY_NAME_FAILURE,
            payload: "No se encontraron conductores",
          });
        }
      }
    } catch (error) {
      // Si ocurre un error durante la búsqueda, dispara la acción para indicar que la búsqueda ha fallado
      dispatch({
        type: SEARCH_DRIVER_BY_NAME_FAILURE,
        payload: error.message,
      });
    }
  };
};
