export const MANGA_VALIDATION = {
  MIN_GENRES: 3,
  MAX_GENRES: 3,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_CHAPTER_IMAGES: 2,
} as const;

export const SEARCH_DEBOUNCE_DELAY = 300;

export const MANGA_MESSAGES = {
  REQUIRED_FIELDS: "Please fill in all required fields.",
  GENRES_COUNT: "Please enter at least and maximum 3 genres.",
  DESCRIPTION_LENGTH: "Description must be less than 500 characters.",
  UPLOAD_COVER_ERROR: "Failed to upload manga cover. Please try again.",
  UPLOAD_COVER_SUCCESS: "Manga Cover Uploaded Successfully",
  ADD_SUCCESS: "Manga Added Successfully",
  ADD_ERROR: "Failed to add manga. Please try again.",
  SELECT_COVER: "Please select a cover image.",
} as const;

export const CHAPTER_MESSAGES = {
  REQUIRED_FIELDS: "Please fill in all required fields.",
  MIN_IMAGES: "Please upload at least 2 images",
  UPLOAD_SUCCESS: "All images uploaded and saved successfully!",
  UPLOAD_ERROR: "Failed to upload and save images. Please try again.",
  ADD_SUCCESS: "Chapter Added Successfully",
  ADD_ERROR: "Failed to add chapter. Please try again.",
  IMAGE_UPLOAD_SUCCESS: (index: number) => `Image ${index + 1} uploaded to Cloudinary`,
  IMAGE_SAVE_SUCCESS: (index: number) => `Image ${index + 1} saved to database`,
} as const;

export const CATEGORY_MESSAGES = {
  NAME_REQUIRED: "Please enter a category name",
  ADD_SUCCESS: "Category added successfully",
  ADD_ERROR: "Failed to add category",
  FETCH_ERROR: "Failed to fetch categories",
  SEARCH_ERROR: "Failed to search manga",
  SELECT_MANGA: "Please select manga to add",
  ADD_MANGA_SUCCESS: (count: number, categoryName: string) =>
    `Added ${count} manga to ${categoryName}`,
  ADD_MANGA_ERROR: "Failed to add manga to category",
  REMOVE_SUCCESS: "Manga removed from category",
  REMOVE_ERROR: "Failed to remove manga from category",
} as const;

export const USER_MESSAGES = {
  FETCH_ERROR: "Failed to fetch users",
} as const;

