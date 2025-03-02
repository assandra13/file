"use client";

import { useState, useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered, LinkIcon, Image, Code } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const insertFormat = (startTag: string, endTag: string) => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = startTag + selectedText + endTag;

    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    onChange(newValue);

    // Set cursor position after update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, start + startTag.length + selectedText.length);
    }, 0);
  };

  const insertBold = () => insertFormat("<strong>", "</strong>");
  const insertItalic = () => insertFormat("<em>", "</em>");
  const insertUnorderedList = () => insertFormat("<ul>\n  <li>", "</li>\n</ul>");
  const insertOrderedList = () => insertFormat("<ol>\n  <li>", "</li>\n</ol>");

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      insertFormat(`<a href="${url}" target="_blank">`, "</a>");
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    const alt = prompt("Enter image description:");
    if (url) {
      insertFormat(`<img src="${url}" alt="${alt || ""}" class="rounded-lg" />`, "");
    }
  };

  const insertCode = () => insertFormat("<pre><code>", "</code></pre>");

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <Button type="button" variant="ghost" size="sm" onClick={insertBold} title="Bold">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={insertItalic} title="Italic">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={insertUnorderedList} title="Bulleted List">
          <List className="h-4 w-4" />
          <span className="sr-only">Bulleted List</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={insertOrderedList} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={insertLink} title="Insert Link">
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Insert Link</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={insertImage} title="Insert Image">
          <Image className="h-4 w-4" />
          <span className="sr-only">Insert Image</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={insertCode} title="Insert Code">
          <Code className="h-4 w-4" />
          <span className="sr-only">Insert Code</span>
        </Button>
      </div>
      <Textarea ref={editorRef} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Tulis konten artikel di sini..." className="min-h-[400px] rounded-none border-0 resize-y font-mono text-sm" />
    </div>
  );
}
