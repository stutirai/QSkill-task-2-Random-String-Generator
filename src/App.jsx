import { useState, useCallback, useEffect } from "react";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [generatedString, setGeneratedString] = useState("");
  const [copied, setCopied] = useState(false);

  const generateString = useCallback(() => {
    let charset = "";
    if (options.uppercase) charset += CHAR_SETS.uppercase;
    if (options.lowercase) charset += CHAR_SETS.lowercase;
    if (options.numbers) charset += CHAR_SETS.numbers;
    if (options.symbols) charset += CHAR_SETS.symbols;

    if (!charset) {
      setGeneratedString("Select at least one option!");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedString(result);
  }, [length, options]);

  useEffect(() => {
    generateString();
  }, [generateString]);

  const handleCopy = useCallback(() => {
    if (!generatedString) return;
    navigator.clipboard.writeText(generatedString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedString]);

  const toggleOption = useCallback((key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div style={{minHeight:"100vh",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",fontFamily:"monospace"}}>
      <div style={{width:"100%",maxWidth:"480px"}}>
        <div style={{textAlign:"center",marginBottom:"24px"}}>
          <h1 style={{fontSize:"28px",fontWeight:"bold",color:"#34d399",margin:"0 0 8px"}}>Random String Generator</h1>
          <p style={{color:"#6b7280",fontSize:"13px",margin:0}}>Uses useState, useCallback & useEffect</p>
        </div>

        <div style={{background:"#1e293b",borderRadius:"16px",padding:"24px",border:"1px solid #334155"}}>
          
          <div style={{background:"#0f172a",borderRadius:"12px",padding:"16px",marginBottom:"16px",position:"relative"}}>
            <p style={{color:"#34d399",fontSize:"16px",wordBreak:"break-all",margin:"0",paddingRight:"60px"}}>{generatedString}</p>
            <button onClick={handleCopy} style={{position:"absolute",top:"12px",right:"12px",background:"#065f46",color:"#34d399",border:"none",borderRadius:"8px",padding:"4px 10px",fontSize:"12px",cursor:"pointer"}}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          <div style={{marginBottom:"16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
              <span style={{color:"#9ca3af",fontSize:"12px"}}>LENGTH</span>
              <span style={{color:"#34d399",fontWeight:"bold"}}>{length}</span>
            </div>
            <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))}
              style={{width:"100%",accentColor:"#34d399",cursor:"pointer"}} />
          </div>

          <div style={{marginBottom:"16px"}}>
            <p style={{color:"#9ca3af",fontSize:"12px",marginBottom:"8px"}}>INCLUDE</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {Object.keys(options).map((key) => (
                <button key={key} onClick={() => toggleOption(key)}
                  style={{padding:"10px",borderRadius:"10px",border:`1px solid ${options[key] ? "#34d399" : "#334155"}`,background:options[key] ? "#064e3b" : "#0f172a",color:options[key] ? "#34d399" : "#6b7280",cursor:"pointer",textTransform:"capitalize",fontSize:"13px"}}>
                  {key}
                </button>
              ))}
            </div>
          </div>

          <button onClick={generateString}
            style={{width:"100%",background:"#059669",color:"white",border:"none",borderRadius:"12px",padding:"12px",fontSize:"14px",fontWeight:"bold",cursor:"pointer"}}>
            ↻ Generate New String
          </button>
        </div>
      </div>
    </div>
  );
}