import axios from "axios";
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
export const RESET_DRIVERS = "RESET_DRIVERS";

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

export const clearSearchError = () => {
  return {
    type: CLEAR_SEARCH_ERROR,
  };
};

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

export const fetchDriversFailure = (error) => {
  return {
    type: FETCH_DRIVERS_FAILURE,
    payload: error,
  };
};

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

export const fetchDriversRequest = () => ({
  type: FETCH_DRIVERS_REQUEST,
});


export const searchDriverByName = (name) => {
  return async (dispatch) => {
    dispatch(fetchDriversRequest()); // Dispara la acción para indicar que se está realizando la solicitud de búsqueda

    try {
      console.log('Search query:', name); // Log de la consulta de búsqueda

      // Realiza la solicitud para buscar conductores por nombre
      const url = `https://pif1-production.up.railway.app/drivers?name.forename=${encodeURIComponent(name)}`;
      console.log('Request URL:', url); // Log de la URL de la solicitud
      const response = await axios.get(url);

      // Verificar si la respuesta es válida y contiene datos
      if (response && response.data && Array.isArray(response.data)) {
        const data = response.data;
        console.log('Drivers found:', data); // Log de los conductores encontrados

        // Si se encuentran conductores, dispara la acción para indicar el éxito de la búsqueda
        if (data.length > 0) {
          dispatch(fetchDriversSuccess(data));
          return; // Salir de la función después de despachar la acción exitosa
        }
      }

      // Si no se encontraron conductores por nombre, intenta buscar por apellido
      const surnameUrl = `https://pif1-production.up.railway.app/drivers?name.surname=${encodeURIComponent(name)}`;
      console.log('Request URL (Surname):', surnameUrl); // Log de la URL de la solicitud por apellido
      const surnameResponse = await axios.get(surnameUrl);

      // Verificar si la respuesta es válida y contiene datos
      if (surnameResponse && surnameResponse.data && Array.isArray(surnameResponse.data)) {
        const surnameData = surnameResponse.data;
        console.log('Drivers found (Surname):', surnameData); // Log de los conductores encontrados por apellido

        // Si se encuentran conductores por apellido, dispara la acción para indicar el éxito de la búsqueda
        if (surnameData.length > 0) {
          dispatch(fetchDriversSuccess(surnameData));
          return; // Salir de la función después de despachar la acción exitosa
        }
      }

      // Si no se encontraron conductores, dispara la acción para indicar que la búsqueda ha fallado
      console.log('No drivers found for query:', name); // Log de la falta de conductores encontrados
      dispatch(fetchDriversFailure('No se encontraron conductores'));
    } catch (error) {
      // Si ocurre un error durante la búsqueda, dispara la acción para indicar que la búsqueda ha fallado
      console.error('Error during search:', error); // Log del error
      dispatch(fetchDriversFailure(error.message));
    }
  };
};

export const createDriverRequest = () => {
  return {
    type: CREATE_DRIVER_REQUEST,
  };
};

export const createDriverSuccess = (driver) => {
  return {
    type: CREATE_DRIVER_SUCCESS,
    payload: driver,
  };
};

export const createDriverFailure = (error) => {
  return {
    type: CREATE_DRIVER_FAILURE,
    payload: error,
  };
};

export const setDrivers = (drivers) => ({
  type: "SET_DRIVERS",
  payload: drivers,
});

export const getDriverByIdSuccess = (driver) => {
  return {
    type: "GET_DRIVER_BY_ID_SUCCESS",
    payload: driver,
  };
};

export const getDriverByIdFailure = (error) => {
  return {
    type: "GET_DRIVER_BY_ID_FAILURE",
    payload: error,
  };
};

export const getDriverById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://pif1-production.up.railway.app/drivers/${id}`
      );
      const driver = response.data;

      dispatch(getDriverByIdSuccess(driver));
    } catch (error) {
      dispatch(getDriverByIdFailure(error));
    }
  };
};

export const setSelectedDriver = (driver) => {
  return {
    type: "SET_SELECTED_DRIVER",
    payload: driver,
  };
};

export const toggleSortOrder = () => ({
  type: "TOGGLE_SORT_ORDER",
});
export const searchDriverByTeamRequest = () => ({
  type: SEARCH_DRIVER_BY_TEAM_REQUEST,
});

export const searchDriverByTeamSuccess = (drivers) => ({
  type: SEARCH_DRIVER_BY_TEAM_SUCCESS,
  payload: drivers,
});

export const searchDriversByTeamAction = (team, drivers) => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload: { team, drivers },
});

export const searchDriverByTeamFailure = (error) => ({
  type: SEARCH_DRIVER_BY_TEAM_FAILURE,
  payload: error,
});

export const resetDrivers = () => ({
  type: RESET_DRIVERS,
});
