import { useEffect, useState } from 'react';

const LeakyComponent = () => {
    useEffect(() => {
        const randomObject = { id: '🔴LEAKED_OBJECT', createdAt: Date.now() };
        const handler = () => console.log('scroll', randomObject);
        window.addEventListener('scroll', handler);
        // Fix
        // return () => window.removeEventListener('scroll', handler);
      }, []);

    return <div>Leaky Component Mounted</div>;
};

export const MemoryLeak = () => {
    const [visible, setVisible] = useState(true);
    return (
        <>
            <button onClick={() => setVisible(!visible)}>Toggle Leak</button>
            {visible && <LeakyComponent />}

            <div>
                <strong>Issue:</strong> Components that register intervals, listeners, or hold references without cleanup can leak memory.<br />
                <strong>How to Diagnose in Edge DevTools:</strong><br />
                Go to the <em>Memory</em> tab. Take a "Heap Snapshot" before and after unmounting the component. Search for custom markers (like <code>🔴LEAKED_OBJECT</code>) or inspect retained objects. Use "Retainers" view to trace where and why the object is still in memory. Fix by properly cleaning up in <code>useEffect</code>.
            </div>

        </>
    );
};
