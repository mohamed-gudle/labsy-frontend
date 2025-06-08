import { axiosInstance } from '@/lib/axios';
import useSWRMutation from 'swr/mutation';

export const useUploadDesign = () => {
    const { trigger } = useSWRMutation('/api/upload-design', async (url, { arg }: { arg: File }) => {
        const formData = new FormData();
        formData.append('file', arg);

        const response = await axiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    });

    return trigger;
};
