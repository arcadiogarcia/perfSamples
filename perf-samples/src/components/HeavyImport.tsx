import { heavyFunction } from './FakeHeavyModule'; // This blocks immediately on import

export const HeavyImport = () => {
    const result = heavyFunction();
    return <>
        <div>{result}</div>
        <div>
            <strong>Issue:</strong> Large libraries like <code>moment</code> can bloat your JavaScript bundle if imported directly.<br />
            <strong>How to Diagnose in Edge DevTools:</strong><br />
            Open the <em>Network</em> tab and reload the page. Filter by "JS" to find large scripts. Use the <em>Coverage</em> tab (Cmd/Ctrl+Shift+P → “Show Coverage”) to find unused code in the bundle. Use the <em>Performance</em> tab to see script parsing and execution time.
        </div>
    </>;
};