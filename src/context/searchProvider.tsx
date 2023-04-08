import { createContext, useState, ReactNode } from "react";

export type SearchContextProps = {
  searchTerm: string;
  setSearchTerm: Function;
};

export const SearchContext = createContext<SearchContextProps>({
  searchTerm: '',
  setSearchTerm: () => {}
})

const search = ''

const SearchProvider = ({ children }: {children: ReactNode}) => {
  const [searchTerm, setSearchTerm] = useState(search);
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
