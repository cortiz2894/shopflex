import { useState } from 'react';

export const useDropdownMenu = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const restartMenu = () => {
    setHoveredIndex(null);
    setHoveredButtonIndex(null);
    setActiveSubmenu(null);
  };

  return {
    hoveredIndex,
    setHoveredIndex,
    setHoveredButtonIndex,
    hoveredButtonIndex,
    showDropdown,
    setShowDropdown,
    restartMenu,
    activeSubmenu,
    setActiveSubmenu,
  };
};
