import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from '../services/jobService';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (filters = {}, { rejectWithValue }) => {
  try {
    const jobs = await jobService.getJobs(filters);
    return jobs;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchJobById = createAsyncThunk('jobs/fetchJobById', async (id, { rejectWithValue }) => {
  try {
    const job = await jobService.getJobById(id);
    return job;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchSimilarJobs = createAsyncThunk('jobs/fetchSimilarJobs', async (id, { rejectWithValue }) => {
  try {
    const similar = await jobService.getSimilarJobs(id);
    return similar;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchRecommendedJobs = createAsyncThunk('jobs/fetchRecommendedJobs', async (skills, { rejectWithValue }) => {
  try {
    const recommended = await jobService.getRecommendedJobs(skills);
    return recommended;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createNewJob = createAsyncThunk('jobs/createNewJob', async (jobData, { rejectWithValue }) => {
  try {
    const newJob = await jobService.createJob(jobData);
    return newJob;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateExistingJob = createAsyncThunk('jobs/updateExistingJob', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const updated = await jobService.updateJob(id, updates);
    return updated;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteExistingJob = createAsyncThunk('jobs/deleteExistingJob', async (id, { rejectWithValue }) => {
  try {
    await jobService.deleteJob(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    items: [],
    selectedJob: null,
    similarJobs: [],
    recommendedJobs: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedJob: (state) => {
      state.selectedJob = null;
      state.similarJobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchJobById
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchSimilarJobs
      .addCase(fetchSimilarJobs.fulfilled, (state, action) => {
        state.similarJobs = action.payload;
      })
      // fetchRecommendedJobs
      .addCase(fetchRecommendedJobs.fulfilled, (state, action) => {
        state.recommendedJobs = action.payload;
      })
      // createNewJob
      .addCase(createNewJob.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // updateExistingJob
      .addCase(updateExistingJob.fulfilled, (state, action) => {
        const index = state.items.findIndex((j) => j.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedJob && state.selectedJob.id === action.payload.id) {
          state.selectedJob = action.payload;
        }
      })
      // deleteExistingJob
      .addCase(deleteExistingJob.fulfilled, (state, action) => {
        state.items = state.items.filter((j) => j.id !== action.payload);
      });
  },
});

export const { clearSelectedJob } = jobsSlice.actions;
export default jobsSlice.reducer;
