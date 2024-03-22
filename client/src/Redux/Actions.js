import axios from "axios";

// Definición de constantes y funciones auxiliares
const ITEMS_PER_PAGE = 10;

const onPageChange = (currentPage) => {
  // Lógica para manejar el cambio de página
  console.log("Página cambiada a:", currentPage);
};

// Action Types
export const FETCH_DRIVERS_REQUEST = 'FETCH_DRIVERS_REQUEST';
export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';
export const FETCH_DRIVERS_FAILURE = 'FETCH_DRIVERS_FAILURE';
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
export const SEARCH_DRIVER_BY_NAME_REQUEST = 'SEARCH_DRIVER_BY_NAME_REQUEST';
export const SEARCH_DRIVER_BY_NAME_SUCCESS = 'SEARCH_DRIVER_BY_NAME_SUCCESS';
export const SEARCH_DRIVER_BY_NAME_FAILURE = 'SEARCH_DRIVER_BY_NAME_FAILURE';

// Action Creators
export const searchDriverByNameRequest = () => ({
  type: SEARCH_DRIVER_BY_NAME_REQUEST,
});

export const searchDriverByNameSuccess = (drivers) => ({
  type: SEARCH_DRIVER_BY_NAME_SUCCESS,
  payload: drivers,
});

export const searchDriverByNameFailure = (error) => ({
  type: SEARCH_DRIVER_BY_NAME_FAILURE,
  payload: error,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const clearSearchError = () => ({
  type: CLEAR_SEARCH_ERROR,
});

// Reducer
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
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_DRIVERS_SUCCESS:
      const teams = {};
      const allDrivers = [];
      const uniqueTeamSet = new Set();

      action.payload.forEach((driver) => {
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

      const uniqueTeamNames = Array.from(uniqueTeamSet);

      return {
        ...state,
        loading: false,
        drivers: allDrivers,
        teams: teams,
        teamNames: uniqueTeamNames,
        newDriver: action.payload,
        searchedDriver: action.payload,
      };

    case CREATE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        newDriver: action.payload,
        drivers: [...state.drivers, action.payload],
      };

    case FETCH_DRIVERS_FAILURE:
    case CREATE_DRIVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_SEARCH_ERROR:
      return {
        ...state,
        searchError: null,
      };

    case GET_DRIVER_BY_ID_SUCCESS:
      return {
        ...state,
        selectedDriver: action.payload,
        loading: false,
        error: null,
      };

    case GET_DRIVER_BY_ID_FAILURE:
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

    case SET_LOADING:
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
