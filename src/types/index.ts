export interface User {
  id: string;
  name: string;
  profilePhoto?: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  availability: 'Weekends' | 'Evenings' | 'Weekdays' | 'Flexible';
  isPublic: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface FilterOptions {
  searchTerm: string;
  availability: string;
}