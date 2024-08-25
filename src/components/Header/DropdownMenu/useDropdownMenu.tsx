import { useState } from 'react';

export const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const openDropdown = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
    openDropdown,
  };
};
