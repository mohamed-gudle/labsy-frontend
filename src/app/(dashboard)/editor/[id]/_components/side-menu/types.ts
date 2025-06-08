export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface DesignToolsDialogState {
    isOpen: boolean;
    preview: string | null;
    isDragging: boolean;
    uploadStatus: UploadStatus;
    error: string;
}
