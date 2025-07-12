// User profile types and interfaces
export const availabilityOptions = [
  "Weekends",
  "Evenings", 
  "Weekdays",
  "Flexible"
];

export const defaultUserProfile = {
  id: null,
  name: "",
  profilePhoto: "",
  location: "",
  skillsOffered: [],
  skillsWanted: [],
  rating: 0,
  availability: [],
  isPublic: true,
  email: "",
  bio: ""
}; 