import { v4 as uuidv4 } from 'uuid';
import { Design } from '../../_components/side-menu/design-picker/types';

export const useUploadDesign = () => {
    // Always use 'google.svg' as the filename for the uploaded design
    const trigger = async (): Promise<Design> => {
        const fileName = 'google.svg';
        const imageUrl = `/mock/${fileName}`;
        const design = {
            id: uuidv4(),
            name: fileName,
            imageUrl,
        };
        return design;
    };
    return trigger;
};
