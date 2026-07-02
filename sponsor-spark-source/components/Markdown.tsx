import React from "react";

// A deliberately small Markdown renderer for the subset our generators emit:
// headings, bold, bullet/numbered lists, blockquotes, horizontal rules, and
// paragraphs. Avoids pulling in a heavy dependency for MVP.

function renderInline(text: string): React.ReactNode[] {
  // Handles **bold** and _italic_ (or *italic*). Bold is matched first.
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    const items = listBuffer.map((li, i) => <li key={i}>{renderInline(li)}</li>);
    blocks.push(listType === "ol" ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>);
    listBuffer = [];
    listType = null;
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    if (/^###\s+/.test(line)) {
      flushList(`l${idx}`);
      blocks.push(<h3 key={idx}>{renderInline(line.replace(/^###\s+/, ""))}</h3>);
    } else if (/^##\s+/.test(line)) {
      flushList(`l${idx}`);
      blocks.push(<h2 key={idx}>{renderInline(line.replace(/^##\s+/, ""))}</h2>);
    } else if (/^#\s+/.test(line)) {
      flushList(`l${idx}`);
      blocks.push(<h1 key={idx}>{renderInline(line.replace(/^#\s+/, ""))}</h1>);
    } else if (/^>\s?/.test(line)) {
      flushList(`l${idx}`);
      blocks.push(
        <blockquote key={idx} className="my-2 border-l-4 border-brand-300 pl-3 italic text-slate-600">
          {renderInline(line.replace(/^>\s?/, ""))}
        </blockquote>,
      );
    } else if (/^---+$/.test(line.trim())) {
      flushList(`l${idx}`);
      blocks.push(<hr key={idx} className="my-3 border-slate-200" />);
    } else if (/^[-*]\s+/.test(line)) {
      if (listType === "ol") flushList(`l${idx}`);
      listType = "ul";
      listBuffer.push(line.replace(/^[-*]\s+/, ""));
    } else if (/^\d+\.\s+/.test(line)) {
      if (listType === "ul") flushList(`l${idx}`);
      listType = "ol";
      listBuffer.push(line.replace(/^\d+\.\s+/, ""));
    } else if (line.trim() === "") {
      flushList(`l${idx}`);
    } else {
      flushList(`l${idx}`);
      blocks.push(<p key={idx}>{renderInline(line)}</p>);
    }
  });
  flushList("l-final");

  return <div className="prose-basic">{blocks}</div>;
}
