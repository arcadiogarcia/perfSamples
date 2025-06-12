import { useState } from 'react';
import { HeavyImport } from './components/LazyHeavyImport';
import { UnnecessaryRerender } from './components/UnnecessaryRerender';
import { BlockingThread } from './components/BlockingThread';
import { ExpensiveDOM } from './components/ExpensiveDOM';
import { MemoryLeak } from './components/MemoryLeak';

const examples = {
  'Unnecessary Rerender': <UnnecessaryRerender />,
  'Blocking Main Thread': <BlockingThread />,
  'Expensive DOM Updates': <ExpensiveDOM />,
  'Memory Leak': <MemoryLeak />,
  'Heavy Import / Bundle Size': <HeavyImport />,
};

export default function App() {
  const [active, setActive] = useState<keyof typeof examples>('Unnecessary Rerender');

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>Web App Performance Examples</h1>
      <div style={{ marginBottom: '1rem' }}>
        {Object.keys(examples).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key as keyof typeof examples)}
            style={{
              marginRight: 8,
              padding: '0.5rem 1rem',
              backgroundColor: key === active ? '#ccc' : '#eee',  
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        {examples[active]}
      </div>
    </div>
  );
}
