import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("// Write your code here");
    const [input, setInput] = useState("");
    const [showInput, setShowInput] = useState(false); // toggle state
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    // Run Code function
    const runCode = async () => {
        setLoading(true);
        setOutput("");

        try {
            const res = await fetch("http://localhost:4000/api/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language, code, input }),
            });

            const data = await res.json();
            if (res.ok) {
                setOutput(data.stdout ? data.stdout : "✅ No Output");
            } else {
                setOutput(data.stderr ? "❌ " + data.stderr : "❌ Error occurred");
            }

        } catch (err) {
            setOutput("❌ Server error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 flex flex-col gap-4">
            {/* Header + Language Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-50">Code Editor</h2>
                <select
                    className="rounded p-2 border border-gray-400 text-sm"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>
            </div>

            {/* Editor Section */}
            <div className="w-full h-[60vh] rounded-lg overflow-hidden shadow-lg border">
                <Editor
                    height="100%"
                    width="100%"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-2">
                {/* Toggle Custom Input */}
                <button
                    onClick={() => setShowInput(!showInput)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 self-start"
                >
                    {showInput ? "Hide Custom Input" : "Add Custom Input"}
                </button>

                {/* Input Section (visible only if toggled) */}
                {showInput && (
                    <textarea
                        className="w-full p-2 border rounded-md text-sm"
                        placeholder="Enter custom input (optional)"
                        rows={4}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                )}

                {/* Run Button */}
                <button
                    onClick={runCode}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Running..." : "Run Code"}
                </button>
            </div>
            {/* Output Section */}
            <div className="w-full p-4 border rounded-md bg-gray-900 text-green-400 text-left font-mono text-sm whitespace-pre-wrap">
                {output || "💡 Output will appear here"}
            </div>
        </div>
    );
}

export default CodeEditor;
