import React from 'react';
import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ProfileSection from './ProfileSection';
import LogoutButton from './LogoutButton';

const DropdownMenuComponent = ({ navItems = [] }: { navItems: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreVertical className="w-6 h-6 text-gray-700" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* Section Profil */}
        <DropdownMenuItem>
          <ProfileSection />
        </DropdownMenuItem>
        {/* Liste des éléments de navigation */}
        {navItems.map((item, index) => (
          <DropdownMenuItem key={index} className="cursor-pointer">
            <a href={item.link}>{item.name}</a>
          </DropdownMenuItem>
        ))}
        {/* Bouton de déconnexion */}
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
