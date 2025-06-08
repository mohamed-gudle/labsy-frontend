import { v4 as uuidv4 } from 'uuid';
import { Design } from '../../_components/side-menu/design-picker/types';

export const useUploadDesign = () => {
    // Instead of SWR, use a local handler for mock uploads
    const trigger = async (file: File): Promise<Design> => {
        // Read file as data URL
        const toDataUrl = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };
        const imageUrl = await toDataUrl(file);
        const design = {
            id: uuidv4(),
            name: file.name,
            imageUrl,
        };
        // Save to localStorage for persistence (optional)
        const key = 'mock-designs';
        const prev = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify([...prev, design]));
        return design;
    };
    return trigger;
};
