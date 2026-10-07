import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationService from '../services/applicationService';

export const fetchSeekerApplications = createAsyncThunk(
  'applications/fetchSeekerApplications',
  async (seekerId, { rejectWithValue }) => {
    try {
      const apps = await applicationService.getSeekerApplications(seekerId);
      return apps;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployerApplications = createAsyncThunk(
  'applications/fetchEmployerApplications',
  async (companyId, { rejectWithValue }) => {
    try {
      const apps = await applicationService.getEmployerApplications(companyId);
      return apps;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyToJob = createAsyncThunk(
  'applications/applyToJob',
  async (applicationData, { rejectWithValue }) => {
    try {
      const newApp = await applicationService.apply(applicationData);
      return newApp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAppStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ applicationId, status, note }, { rejectWithValue }) => {
    try {
      const updated = await applicationService.updateStatus(applicationId, status, note);
      return updated;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const withdrawApp = createAsyncThunk(
  'applications/withdraw',
  async (applicationId, { rejectWithValue }) => {
    try {
      await applicationService.withdraw(applicationId);
      return applicationId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    applySuccess: false,
  },
  reducers: {
    resetApplySuccess: (state) => {
      state.applySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSeekerApplications
      .addCase(fetchSeekerApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSeekerApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSeekerApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchEmployerApplications
      .addCase(fetchEmployerApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEmployerApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      // applyToJob
      .addCase(applyToJob.pending, (state) => {
        state.isLoading = true;
        state.applySuccess = false;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        state.applySuccess = true;
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // updateAppStatus
      .addCase(updateAppStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // withdrawApp
      .addCase(withdrawApp.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export const { resetApplySuccess } = applicationsSlice.actions;
export default applicationsSlice.reducer;
