import axios from '@/libs/api';

interface ContributorPayload {
  employee_name: string;
  hours_spent: number;
}

interface WorkLogPayload {
  task_description: string;
  date: string;
  hourly_rate: number;
  additional_charges?: number;
  contributors: ContributorPayload[];
}

interface QueryParams {
  search?: string | number;
  sort?: string;
  order?: 'asc' | 'desc';
}

const worklogService = {
  async getAllWorkLogs(params?: QueryParams) {
    const response = await axios.get('/work-logs', { params });
    return response.data;
  },

  async getWorkLogById(id: number | string) {
    const response = await axios.get(`/work-logs/${id}`);
    return response.data;
  },

  async createWorkLog(payload: WorkLogPayload) {
    const response = await axios.post('/work-logs', payload);
    return response.data;
  },

  async updateWorkLog(id: number | string, payload: WorkLogPayload) {
    const response = await axios.put(`/work-logs/${id}`, payload);
    return response.data;
  },

  async deleteWorkLog(id: number | string) {
    const response = await axios.delete(`/work-logs/${id}`);
    return response.data;
  },
};

export default worklogService;
