import axios from "axios";

// API Base URL - adjust based on environment
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401, token expired - clear and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authApi = {
  /**
   * Register new user
   */
  register: async (data: {
    email: string;
    username: string;
    password: string;
    fullName: string;
  }) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  /**
   * Get GitHub OAuth URL
   */
  getGitHubAuthUrl: async () => {
    const response = await apiClient.get("/auth/github/login");
    return response.data;
  },

  /**
   * Get GitHub connection status
   */
  getGitHubStatus: async () => {
    const response = await apiClient.get("/auth/github/status");
    return response.data;
  },

  /**
   * Get user's GitHub repositories
   */
  getGitHubRepositories: async (page: number = 1, perPage: number = 30) => {
    const response = await apiClient.get(
      `/auth/github/repositories?page=${page}&perPage=${perPage}`
    );
    return response.data;
  },

  /**
   * Disconnect GitHub account
   */
  disconnectGitHub: async () => {
    const response = await apiClient.post("/auth/github/disconnect");
    return response.data;
  },
};

// Projects API calls
export const projectsApi = {
  /**
   * Get all projects
   */
  getProjects: async () => {
    const response = await apiClient.get("/projects");
    return response.data;
  },

  /**
   * Get single project
   */
  getProject: async (projectId: string) => {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  },

  /**
   * Create new project
   */
  createProject: async (data: any) => {
    const response = await apiClient.post("/projects", data);
    return response.data;
  },

  /**
   * Update project
   */
  updateProject: async (projectId: string, data: any) => {
    const response = await apiClient.put(`/projects/${projectId}`, data);
    return response.data;
  },

  /**
   * Delete project
   */
  deleteProject: async (projectId: string) => {
    const response = await apiClient.delete(`/projects/${projectId}`);
    return response.data;
  },

  /**
   * Create/trigger deployment for a project
   */
  createDeployment: async (projectId: string) => {
    const response = await apiClient.post(
      `/projects/${projectId}/deployments`,
      {}
    );
    return response.data;
  },
};

// Environments API calls
export const environmentsApi = {
  /**
   * Get all environments for a project
   */
  getEnvironments: async (projectId: string) => {
    const response = await apiClient.get(`/projects/${projectId}/environments`);
    return response.data;
  },

  /**
   * Create environment for a project
   */
  createEnvironment: async (projectId: string, data: any) => {
    const response = await apiClient.post(
      `/projects/${projectId}/environments`,
      data
    );
    return response.data;
  },

  /**
   * Update environment
   */
  updateEnvironment: async (environmentId: string, data: any) => {
    const response = await apiClient.put(
      `/environments/${environmentId}`,
      data
    );
    return response.data;
  },

  /**
   * Delete environment
   */
  deleteEnvironment: async (environmentId: string) => {
    const response = await apiClient.delete(`/environments/${environmentId}`);
    return response.data;
  },
};

// Deployments API calls
export const deploymentsApi = {
  /**
   * Get all deployments
   */
  getDeployments: async (projectId: string) => {
    const response = await apiClient.get(`/deployments?projectId=${projectId}`);
    return response.data;
  },

  /**
   * Deploy project
   */
  deploy: async (projectId: string, data: any) => {
    const response = await apiClient.post(`/deployments`, {
      projectId,
      ...data,
    });
    return response.data;
  },

  /**
   * Create deployment for a project (with environmentId)
   */
  createDeployment: async (environmentId: string, data?: any) => {
    const response = await apiClient.post(
      `/projects/${data?.projectId}/deployments`,
      {
        environmentId,
        ...data,
      }
    );
    return response.data;
  },

  /**
   * Get deployment status
   */
  getDeploymentStatus: async (deploymentId: string) => {
    const response = await apiClient.get(`/deployments/${deploymentId}`);
    return response.data;
  },
};

export default apiClient;
