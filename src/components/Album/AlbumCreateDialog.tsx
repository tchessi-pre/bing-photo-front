'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

type AlbumCreateDialogProps = {
  onCreateAlbum: (albumName: string) => void;
};

const AlbumCreateDialog: React.FC<AlbumCreateDialogProps> = ({ onCreateAlbum }) => {
  const [albumName, setAlbumName] = useState('');

  const handleCreate = () => {
    if (albumName.trim() === '') {
      alert('Veuillez entrer un nom pour l\'album.');
      return;
    }
    onCreateAlbum(albumName);
    setAlbumName('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-green-900 text-white hover:bg-green-800 transition-colors">
          <Plus className="w-5 h-5" />
          Créer un album
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Créer un nouvel album</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="albumName" className="block text-sm font-medium text-gray-700">
              Titre de l'album
            </Label>
            <Input
              id="albumName"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="Entrez le titre pour l'album"
              className="mt-2 w-full"
            />
          </div>
          <Button
            onClick={handleCreate}
            className="w-full bg-green-900 text-white hover:bg-green-800 transition-colors"
          >
            Créer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumCreateDialog;
