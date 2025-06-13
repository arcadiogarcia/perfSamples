import React, { Suspense } from 'react';

const LazyHeavyImport = React.lazy(() => import('./HeavyImport').then(module => ({
    default: module.HeavyImport,
  })));

export const HeavyImport = () => {
    return <>
         <Suspense fallback={<div>⏳ Loading heavy module...</div>}>
            <LazyHeavyImport />
        </Suspense>
    </>;
};