// 3. Blocking the Main Thread
// - Open Performance tab → Click "Record" → Trigger the blocking action.
// - Look for long "Task" sections in the flame chart (usually >50ms).
// - Click into them to find the JavaScript code causing the blockage.
// - Long synchronous loops or CPU-heavy work should be deferred or offloaded.


import { useState } from 'react';


function expensiveProcessing(from: number, to: number): number {
    let sum = 0;
    for (let i = from; i < to; i++) sum += Math.sin(i);
    return (sum);
}

export const BlockingThread = () => {
    const [result, setResult] = useState<number | null>(null);

    const clear = () => {
        setResult(0);
    };

    const totalIterations = 5e8;

    const blockMainThread = () => {
        const sum = expensiveProcessing(0, totalIterations);
        setResult(sum);
    };

    // By breaking the work into smaller chunks, we can avoid blocking the main thread for too long.
    // Note: returns a different total sum because floating point precision is fun like that, that's beside the point of this example.
    const doNotBlockMainThread = async () => {
        let sum = 0;
        let i = 0;
        const chunkSize = 1e6; // 1 million per chunk
    
        function processChunk() {
            console.log(`Processing chunk from ${i} to ${i + chunkSize}`);
            if (i < totalIterations) {
                sum += expensiveProcessing(i, i + chunkSize);
                i += chunkSize;
                setTimeout(processChunk, 0);
            } else {
                setResult(sum);
            }
        }
    
        processChunk(); // Start processing
    };

    return (
        <>
            <button onClick={clear}>Clear</button>
            <button onClick={blockMainThread}>Block Main Thread</button>
            <button onClick={doNotBlockMainThread}>Do not block main Thread</button>
            {result !== null && <div>Result: {result}</div>}


            <div>
                <strong>Issue:</strong> Long-running JavaScript (e.g., loops or sorting) blocks the main thread, causing UI freezes.<br />
                <strong>How to Diagnose in Edge DevTools:</strong><br />
                Open the <em>Performance</em> tab, click "Record", trigger the action, and stop recording. Look for long "Task" bars in the flame chart (over 50ms). Click into them to see the exact function or line blocking the main thread. Use <code>requestIdleCallback</code> or move logic to a <em>Web Worker</em> to fix.
            </div>
        </>
    );
};
