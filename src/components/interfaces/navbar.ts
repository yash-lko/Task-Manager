
export interface NavbarProps {
    userName: string;
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleLogout: () => void;
  }