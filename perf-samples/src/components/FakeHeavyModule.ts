// Simulate slow parsing/execution on import
const start = performance.now();

// Expensive no-op loop (~100ms–1000ms depending on count)
while (performance.now() - start < 10000) {
  // Simulate "work" (like parsing large JS)
  Math.sqrt(Math.random());
}

export function heavyFunction() {
  return '✅ Fake heavy module loaded';
}
