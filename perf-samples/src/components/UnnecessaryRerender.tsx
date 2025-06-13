import React, { useState } from 'react';

const Child = React.memo(({ items }: { items: number[] }) => {
    console.log('Child rendered, at huge cost!');;
    return <div>Items length: {items.length}</div>;
});

export const UnnecessaryRerender = () => {
    const [count, setCount] = useState(0);
    const items = [1, 2, 3];
    // Fix: 
    // const items = useMemo(() => [1, 2, 3], []);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
            <Child items={items} />

            <div>
                <strong>Issue:</strong> Components re-render unnecessarily when props or state change even if nothing visual changes.<br />
                <strong>How to Diagnose in Edge DevTools:</strong><br />
                Use the <em>React Developer Tools</em> extension → <em>Profiler</em> tab. Click "Record", interact with your app, and inspect which components re-render and why. Look for unchanged props or values that trigger renders. Use <code>React.memo</code>, <code>useMemo</code>, or <code>useCallback</code> to optimize.
            </div>

        </>
    );
};
