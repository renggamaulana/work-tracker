import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/sales"}/transactions`;

const transactionService = {
  getAllTransactions: async (params:any) => {
    try {
      const response = await axios.get(API_URL, {params});
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  getTransactionById: async (id:string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  },

  createTransaction: async (transactionData:any) => {
    try {
      const response = await axios.post(API_URL, transactionData);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  updateTransaction: async (id:string, categoryData:any) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating transaction ${id}:`, error);
      throw error;
    }
  },

  deleteTransaction: async (id:string) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }
};

export default transactionService;