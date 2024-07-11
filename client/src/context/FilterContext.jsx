import { createContext, useState } from "react";

// Create the context
export const FilterContext = createContext();

// Create the provider component
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    type: "Non-Guided",
    ease: "Easy",
    topic: "Arrays & Hashing",
    time: [],
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
