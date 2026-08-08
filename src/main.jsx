import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const palette = [
  { name: "blue/50", role: "Nền rất nhạt", color: "#EFF6FF", text: "#172554" },
  { name: "blue/100", role: "Nền subtle", color: "#DBEAFE", text: "#172554" },
  { name: "blue/200", role: "Nền chọn nhẹ", color: "#BFDBFE", text: "#172554" },
  { name: "blue/300", role: "Viền hoặc disabled", color: "#93C5FD", text: "#172554" },
  { name: "blue/400", role: "Icon nhẹ", color: "#60A5FA", text: "#FFFFFF" },
  { name: "blue/500", role: "Action chính", color: "#3B82F6", text: "#FFFFFF" },
  { name: "blue/600", role: "Hover", color: "#2563EB", text: "#FFFFFF" },
  { name: "blue/700", role: "Pressed hoặc text", color: "#1D4ED8", text: "#FFFFFF" },
  { name: "blue/800", role: "Text đậm", color: "#1E40AF", text: "#FFFFFF" },
  { name: "blue/900", role: "Tương phản cao", color: "#1E3A8A", text: "#FFFFFF" }
];

const source = `const palette = [
  { name: "blue/50", color: "#EFF6FF", role: "Nền rất nhạt" },
  { name: "blue/500", color: "#3B82F6", role: "Action chính" },
  { name: "blue/900", color: "#1E3A8A", role: "Tương phản cao" }
];

<div className="swatches">
  {palette.map((token) => (
    <article
      style={{ background: token.color, color: token.text }}
      className="swatch"
    >
      <strong>{token.name}</strong>
      <span>{token.role}</span>
    </article>
  ))}
</div>`;

function App() {
  const [tab, setTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="page">
      <section className="playground" aria-label="Blue scale component playground">
        <header className="toolbar">
          <div className="tabs" role="tablist" aria-label="Playground view">
            <button
              className={tab === "preview" ? "tab active" : "tab"}
              onClick={() => setTab("preview")}
              role="tab"
              aria-selected={tab === "preview"}
            >
              ◉ Preview
            </button>
            <button
              className={tab === "code" ? "tab active" : "tab"}
              onClick={() => setTab("code")}
              role="tab"
              aria-selected={tab === "code"}
            >
              &lt;/&gt; Code
            </button>
          </div>
          <button className="copy" onClick={copyCode}>
            ▣ {copied ? "Copied" : "Copy"}
          </button>
        </header>

        <div className="canvas">
          {tab === "preview" ? (
            <div className="swatches">
              {palette.map((token) => (
                <article
                  className="swatch"
                  key={token.name}
                  style={{ backgroundColor: token.color, color: token.text }}
                >
                  <strong>{token.name}</strong>
                  <span>{token.role}</span>
                </article>
              ))}
            </div>
          ) : (
            <pre className="code"><code>{source}</code></pre>
          )}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
