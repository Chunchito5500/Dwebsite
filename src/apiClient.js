import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.trieve.ai",
  headers: {
    "Content-Type": "application/json",
    "TR-Organization": process.env.REACT_APP_TR_ORGANIZATION,
    "TR-Dataset": process.env.REACT_APP_TR_DATASET,
    Authorization: process.env.REACT_APP_AUTHORIZATION,
  },
});

export const addChunk = async (chunkHtml, link) => {
  try {
    const response = await apiClient.post("/api/chunk", {
      chunk_html: chunkHtml,
      link: link,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding chunk:", error);
    throw error;
  }
};

export const searchChunks = async (content, searchType = "hybrid") => {
  try {
    const response = await apiClient.post("/api/chunk/search", {
      content: content,
      search_type: searchType,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching chunks:", error);
    throw error;
  }
};
