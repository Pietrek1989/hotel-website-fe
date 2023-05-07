import { ImageState } from "../../../types and interfaces";

export const fetchImages = async (): Promise<ImageState> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/images`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    console.log("inn func", data);

    return data[0];
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    return { gallery: [], hero: [] };
  }
};
