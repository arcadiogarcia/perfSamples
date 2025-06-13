import { useState } from 'react';

export const ExpensiveDOM = () => {
    const [show, setShow] = useState(false);

    const bigList = Array.from({ length: 10000 }, (_, i) => <div key={i}>Row {i}</div>);

    return (
        <>
            <button onClick={() => setShow(!show)}>Toggle Big List</button>
            {show && <div>{bigList}</div>}

            <div>
                <strong>Issue:</strong> Rendering many DOM elements (e.g., large lists) can slow down layout and painting.<br />
                <strong>How to Diagnose in Edge DevTools:</strong><br />
                In the <em>Performance</em> tab, record interactions that trigger large UI updates. Look for long "Recalculate Style", "Layout", "Commit", or "Paint" sections. Enable advanced paint instrumentation. Use list virtualization (e.g., <code>react-window</code>) to improve performance.
            </div>
        </>
    );
};
