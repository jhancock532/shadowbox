import React from 'react';

export interface LinkMapping {
    baseReportId: string;
    baseLinks: {
        [key: string]: string;
    }[];
    comparedReportId?: string;
    comparedLinks?: {
        [key: string]: string;
    }[];
}
export type LinkMappingContextType = {
    links: LinkMapping;
};

export const LinkMappingContext =
    React.createContext<LinkMappingContextType | null>(null);

const LinkMappingProvider = ({ children, linkMapping }: any) => {
    const memoizedValue = React.useMemo(
        () => ({ links: linkMapping }),
        [linkMapping],
    );

    return (
        <LinkMappingContext.Provider value={memoizedValue}>
            {children}
        </LinkMappingContext.Provider>
    );
};

export default LinkMappingProvider;
