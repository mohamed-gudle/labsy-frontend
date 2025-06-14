'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { PrintableAreaInput } from '@/lib/types/products';

interface PrintAreaSidebarProps {
  printArea: PrintableAreaInput;
  onUpdate: (updates: Partial<PrintableAreaInput>) => void;
}

export function PrintAreaSidebar({
  printArea,
  onUpdate,
}: PrintAreaSidebarProps) {
  // Pixel to MM conversion (assuming 72 DPI as base, adjustable by print area DPI)
  const pixelToMm = (pixels: number) => (pixels * 25.4) / (printArea.dpi || 300);
  const mmToPixel = (mm: number) => (mm * (printArea.dpi || 300)) / 25.4;

  const updateField = (field: keyof PrintableAreaInput, value: string | number | boolean) => {
    onUpdate({ [field]: value });
  };

  const updateCoordinate = (coord: 'x' | 'y' | 'width' | 'height', value: string) => {
    const numValue = parseFloat(value) || 0;
    const pixelValue = mmToPixel(numValue);
    updateField(coord, pixelValue);
  };

  return (
    <Card className="w-full h-fit max-w-sm min-w-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm truncate">Print Area Properties</CardTitle>
          <Badge variant="secondary" className="text-xs shrink-0 ml-2">
            {printArea.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 overflow-hidden">
        {/* Basic Info */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="area-name" className="text-xs font-medium">
              Name
            </Label>
            <Input
              id="area-name"
              value={printArea.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('name', e.target.value)}
              className="h-8 text-xs"
              placeholder="e.g., Front, Back, Sleeve"
            />
          </div>

          <div>
            <Label htmlFor="area-description" className="text-xs font-medium">
              Description
            </Label>
            <Textarea
              id="area-description"
              value={printArea.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField('description', e.target.value)}
              className="text-xs resize-none"
              rows={2}
              placeholder="Describe this print area..."
            />
          </div>
        </div>

        {/* Coordinates */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Position & Size (mm)
          </h4>

          <div className="grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <Label htmlFor="area-x" className="text-xs">X Position</Label>
              <Input
                id="area-x"
                type="number"
                value={Math.round(pixelToMm(printArea.x) * 10) / 10}
                onChange={(e) => updateCoordinate('x', e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
            <div className="min-w-0">
              <Label htmlFor="area-y" className="text-xs">Y Position</Label>
              <Input
                id="area-y"
                type="number"
                value={Math.round(pixelToMm(printArea.y) * 10) / 10}
                onChange={(e) => updateCoordinate('y', e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <Label htmlFor="area-width" className="text-xs">Width</Label>
              <Input
                id="area-width"
                type="number"
                value={Math.round(pixelToMm(printArea.width) * 10) / 10}
                onChange={(e) => updateCoordinate('width', e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
            <div className="min-w-0">
              <Label htmlFor="area-height" className="text-xs">Height</Label>
              <Input
                id="area-height"
                type="number"
                value={Math.round(pixelToMm(printArea.height) * 10) / 10}
                onChange={(e) => updateCoordinate('height', e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
          </div>

          {/* Real-time pixel values */}
          <div className="text-xs text-muted-foreground space-y-1 p-2 bg-muted/30 rounded">
            <div className="flex justify-between">
              <span>Pixels:</span>
              <span>{Math.round(printArea.x)}, {Math.round(printArea.y)}</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span>{Math.round(printArea.width)} × {Math.round(printArea.height)}px</span>
            </div>
          </div>
        </div>

        {/* Print Settings */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Print Settings
          </h4>

          <div>
            <Label htmlFor="area-dpi" className="text-xs font-medium">
              DPI (Dots Per Inch)
            </Label>
            <Input
              id="area-dpi"
              type="number"
              value={printArea.dpi}
              onChange={(e) => updateField('dpi', parseInt(e.target.value) || 300)}
              className="h-8 text-xs"
              min="72"
              max="600"
              step="1"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="area-printable" className="text-xs font-medium">
              Printable Area
            </Label>
            <Switch
              id="area-printable"
              checked={printArea.printable}
              onCheckedChange={(checked: boolean) => updateField('printable', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
