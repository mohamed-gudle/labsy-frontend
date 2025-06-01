import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface DesignItem {
  id: string;
  type: 'image' | 'text';
  content: string;
}

export const AddDesigns: React.FC = () => {
  const [designs, setDesigns] = useState<DesignItem[]>([]);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 50 * 1024 * 1024) { // Max file size: 50MB
      const reader = new FileReader();
      reader.onload = () => {
        setDesigns((prev) => [
          ...prev,
          { id: Date.now().toString(), type: 'image', content: reader.result as string },
        ]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('File size exceeds 50MB or invalid file.');
    }
  };

  const handleAddText = (text: string) => {
    if (text.trim()) {
      setDesigns((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'text', content: text },
      ]);
    }
  };

  const handleRemoveDesign = (id: string) => {
    setDesigns((prev) => prev.filter((design) => design.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="image-upload" className="cursor-pointer">
          <Button variant="outline">Add Image</Button>
        </Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAddImage}
        />
        <Button
          variant="outline"
          onClick={() => {
            const text = prompt('Enter your text:');
            if (text) handleAddText(text);
          }}
        >
          Add Text
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {designs.map((design) => (
          <Card key={design.id} className="relative p-4">
            {design.type === 'image' ? (
              <Image
                src={design.content}
                alt="Design Preview"
                width={200}
                height={200}
                className="object-cover"
              />
            ) : (
              <p className="text-center text-lg font-medium">{design.content}</p>
            )}
            <Button
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={() => handleRemoveDesign(design.id)}
            >
              Remove
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddDesigns;