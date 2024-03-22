import {
  FETCH_DRIVERS_REQUEST,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  CREATE_DRIVER_REQUEST,
  CREATE_DRIVER_SUCCESS,
  CREATE_DRIVER_FAILURE,
  CLEAR_SEARCH_ERROR,
  GET_DRIVER_BY_ID_SUCCESS,
  GET_DRIVER_BY_ID_FAILURE,
  SET_SELECTED_DRIVER,
  SET_LOADING,
  TOGGLE_SORT_ORDER,
  SEARCH_DRIVER_BY_TEAM_REQUEST,
  SEARCH_DRIVER_BY_TEAM_SUCCESS,
  SEARCH_DRIVER_BY_TEAM_FAILURE,
  RESET_DRIVERS,
  SEARCH_DRIVER_BY_NAME_REQUEST,
  SEARCH_DRIVER_BY_NAME_SUCCESS,
  SEARCH_DRIVER_BY_NAME_FAILURE,
} from "./Actions";

const initialState = {
  teams: {},
  teamNames: [],
  drivers: [],
  newDriver: null,
  loading: false,
  error: null,
  searchError: null,
  searchedDriver: [],
  selectedDriver: null,
  sortDrivers: false,
};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVERS_REQUEST:
    case CREATE_DRIVER_REQUEST:
      console.log("Fetching or creating drivers. Loading set to true.");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_DRIVERS_SUCCESS:
      console.log("Successfully fetched drivers.");
      console.log("Drivers:", action.payload);

      const teams = action.payload.teams;
      const teamNames = action.payload.teamNames;

      console.log("Equipos actualizados:", teams);
      console.log("Team Names:", teamNames);

      return {
        ...state,
        loading: false,
        drivers: action.payload.drivers,
        teams: teams,
        teamNames: teamNames,
        newDriver: action.payload,
        searchedDriver: action.payload.drivers, // Asegura que los conductores buscados estén actualizados
      };

    case CREATE_DRIVER_SUCCESS:
      console.log("Successfully created a new driver.");
      return {
        ...state,
        loading: false,
        newDriver: action.payload,
        drivers: [...state.drivers, action.payload],
      };

    case FETCH_DRIVERS_FAILURE:
    case CREATE_DRIVER_FAILURE:
      console.error("Failed to fetch or create drivers.", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_SEARCH_ERROR:
      console.log("Clearing search error.");
      return {
        ...state,
        searchError: null,
      };

    case GET_DRIVER_BY_ID_SUCCESS:
      console.log("Successfully got driver by ID:", action.payload);
      return {
        ...state,
        selectedDriver: action.payload,
        loading: false,
        error: null,
      };

    case GET_DRIVER_BY_ID_FAILURE:
      console.error("Failed to get driver by ID. Error:", action.payload);
      return {
        ...state,
        selectedDriver: null,
        loading: false,
        error: action.payload,
      };

    case SET_SELECTED_DRIVER:
      return {
        ...state,
        selectedDriver: action.payload,
      };

    case SET_LOADING: // Agrega el nuevo caso
      return {
        ...state,
        loading: action.payload,
      };

    case TOGGLE_SORT_ORDER:
      return {
        ...state,
        sortDrivers: !state.sortDrivers,
      };
    case SEARCH_DRIVER_BY_TEAM_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEARCH_DRIVER_BY_TEAM_SUCCESS:
      const { team, drivers } = action.payload;
      console.log(`Successfully fetched drivers for team: ${team}`);
      console.log("Drivers for team:", drivers);
      return {
        ...state,
        teams: {
          ...state.teams,
          [team]: drivers,
        },
      };

    case SEARCH_DRIVER_BY_TEAM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case RESET_DRIVERS:
      console.log("Resetting drivers to initial state.");
      return {
        ...state,
        drivers: initialState.drivers,
        searchedDriver: initialState.searchedDriver,
      };

    case SEARCH_DRIVER_BY_NAME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SEARCH_DRIVER_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: action.payload,
        error: null,
      };

    case SEARCH_DRIVER_BY_NAME_FAILURE:
      return {
        ...state,
        loading: false,
        drivers: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default driverReducer;
