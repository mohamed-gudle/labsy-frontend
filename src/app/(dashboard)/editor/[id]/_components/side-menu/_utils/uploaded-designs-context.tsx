import React, { createContext, useContext, useState } from "react";
import type { Design } from "@/app/(dashboard)/editor/[id]/_components/side-menu/design-picker/types";

interface UploadedDesignsContextProps {
    designs: Design[];
    addDesign: (design: Design) => void;
}

const UploadedDesignsContext = createContext<UploadedDesignsContextProps | undefined>(undefined);

export const UploadedDesignsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [designs, setDesigns] = useState<Design[]>([]);

    const addDesign = (design: Design) => {
        setDesigns((prev) => [...prev, design]);
    };

    return (
        <UploadedDesignsContext.Provider value={{ designs, addDesign }}>
            {children}
        </UploadedDesignsContext.Provider>
    );
};

export const useUploadedDesigns = () => {
    const ctx = useContext(UploadedDesignsContext);
    if (!ctx) throw new Error("useUploadedDesigns must be used within UploadedDesignsProvider");
    return ctx;
};
