import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/Settings/";
// const BASE_URL = "api/Settings/";

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}User_RUD/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}User_RUD/users/${id}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}User_RUD/users/${id}/`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

  
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}api/register/`, userData);
      return response.data; // return the response data if needed
    } catch (error) {
      console.error("Error registering user:", error);
      throw error; // Re-throw the error to be handled by the calling component
    }
  };


  //Login


// Login API integration
export const 
loginUser = async (username, password,year) => {
  try {
    const response = await axios.post(`${BASE_URL}api/login/`, {
      username,
      password,
      year,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors and rethrow them for the calling function to manage
    console.error("Error logging in:", error);
    throw error.response?.data || error.message || "Error logging in.";
  }
};

  
  // user client
  export const fetchUsersDropdown = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/users-dropdown/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Let the caller handle the error
    }
  };
  
  // Assign permissions
  export const assignPermissions = async (userId, modulesToSubmit) => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }
  
    try {
      const response = await axios.post(
        `${BASE_URL}api/assign-permission/`,
        {
          id: userId,
          modules: modulesToSubmit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in assignPermissions API:", error);
      throw error;
    }
  };
  

  // Financial Year
  // Function to create a new financial year
export const createFinancialYear = async (financialYearData) => {
  try {
    const response = await axios.post(`${BASE_URL}financial_years/`, financialYearData);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating financial year:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

// Function to fetch all financial years
export const getFinancialYears = async () => {
  try {
    const response = await axios.get(`${BASE_URL}financial_years/`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching financial years:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

// Function to determine default route based on user permissions
export const getDefaultRoute = (permissions, username) => {
  if (!permissions) return "/dashboard";

  const usernameLower = (username || "").trim().toLowerCase();
  if (
    usernameLower === "admin" ||
    usernameLower === "prashant" ||
    permissions?.role === "admin" ||
    permissions === "all"
  ) {
    return "/dashboard";
  }

  // Dashboard check
  if (permissions.Dashboard && permissions.Dashboard.length > 0) {
    return "/dashboard";
  }

  // ERP Setting check
  if (permissions.ERPSetting && permissions.ERPSetting.length > 0) {
    if (permissions.ERPSetting.includes("User Configuration")) return "/ErpSetting";
    if (permissions.ERPSetting.includes("User Permission")) return "/User-Permit";
    if (permissions.ERPSetting.includes("Dashboard Permission")) return "/DashboardPermission";
    return "/change-password";
  }

  // All Masters check
  if (permissions.All_Masters && permissions.All_Masters.length > 0) {
    if (permissions.All_Masters.includes("Item Master")) return "/item-master";
    if (permissions.All_Masters.includes("Customer")) return "/business-partner";
    if (permissions.All_Masters.includes("vender-list")) return "/vender-list";
    return "/item-master";
  }

  // Purchase check
  if (permissions.Purchase && permissions.Purchase.length > 0) {
    if (permissions.Purchase.includes("New Purchase Order")) return "/new-purchase-order";
    if (permissions.Purchase.includes("New Indent")) return "/new-indent";
    return "/new-purchase-order";
  }

  // Accounts check
  if (permissions.Accounts && permissions.Accounts.length > 0) {
    if (permissions.Accounts.includes("Bill Passing")) return "/purchase-bill";
    return "/purchase-bill";
  }

  // Store check
  if (permissions.Store && permissions.Store.length > 0) {
    if (permissions.Store.includes("Gate Inward Entry")) return "/Gate-Inward-Entry";
    return "/Gate-Inward-Entry";
  }

  // Maintenance check
  if (permissions.Maintenance && permissions.Maintenance.length > 0) {
    if (permissions.Maintenance.includes("Breakdown List")) return "/breakdown-list";
    return "/breakdown-list";
  }

  // Production check
  if (permissions.Production && permissions.Production.length > 0) {
    return "/ProductionEntryList";
  }

  // Production V2 check
  if (permissions.ProductionV2 && permissions.ProductionV2.length > 0) {
    return "/WorkOrderEntryV2";
  }

  // Quality check
  if (permissions.Quality && permissions.Quality.length > 0) {
    return "/InprocessInspection";
  }

  // Planning check
  if (permissions.Planning && permissions.Planning.length > 0) {
    return "/UpcomingDispatchList";
  }

  // Sales check
  if (permissions.Sales && permissions.Sales.length > 0) {
    return "/GSTsales";
  }

  return "/dashboard";
};


