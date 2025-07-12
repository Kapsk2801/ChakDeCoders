import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchAndFilter } from './components/SearchAndFilter';
import { UserCard } from './components/UserCard';
import { Pagination } from './components/Pagination';
import { mockUsers } from './data/mockUsers';
import type { FilterOptions } from './types';

const USERS_PER_PAGE = 6;

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    availability: 'All',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      if (!user.isPublic) return false;

      const matchesSearch = filters.searchTerm === '' || 
        [...user.skillsOffered, ...user.skillsWanted]
          .some(skill => skill.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      const matchesAvailability = filters.availability === 'All' || 
        user.availability === filters.availability;

      return matchesSearch && matchesAvailability;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleRequestClick = (userId: string) => {
    // TODO: Implement request functionality
    console.log('Request sent to user:', userId);
    alert('Swap request sent! 🎉');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <SearchAndFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Discover Talented People
            </h2>
            <div className="text-gray-400 text-sm">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
            </div>
          </div>
        </div>

        {paginatedUsers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onRequestClick={handleRequestClick}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="glass-card p-8 max-w-md mx-auto">
              <div className="text-gray-400 text-lg mb-2">No users found</div>
              <div className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;