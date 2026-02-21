import { useState } from "react";
import logo from "../assets/sprite.png";

// ============================================================
// 🔗 GOOGLE SHEETS URL  (fixed — removed the stray "Y" prefix)
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz7q4kMiNBfdI_JqTkijmd8qG-kTlw0I65yLscSgTm6Rjrn_5kqoEq-3jvNcryNbSs9/exec";
// ============================================================

// ============================================================
// 🖼️  BACKGROUND LOGO
// To change the logo: import a different image and set it here
const BG_LOGO = logo;
// ============================================================

const FIELDS = [
    { id: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
    { id: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
    { id: "message", label: "Message", type: "textarea", placeholder: "How can we help you?", required: true },
];

const EMPTY = { name: "", email: "", message: "" };

export default function CustomerService() {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [focused, setFocused] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async () => {
        for (const f of FIELDS) {
            if (f.required && !form[f.id].trim()) {
                alert(`Please fill in the "${f.label}" field.`);
                return;
            }
        }

        setStatus("loading");

        try {
            const params = new URLSearchParams({
                name: form.name,
                email: form.email,
                message: form.message,
                timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            });

            await fetch(`${GOOGLE_SHEET_URL}?${params.toString()}`, {
                method: "GET",
                mode: "no-cors",
            });

            setStatus("success");
            setForm(EMPTY);
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    const handleReset = () => setStatus("idle");

    return (
        <div id="services" className="services" style={{
            minHeight: "100vh",
            background: "#5dbb15",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            fontFamily: "'Trebuchet MS', sans-serif",
            position: "relative",
            overflow: "hidden",
        }}>

            <style>{`
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

            {/* Background logo watermark */}
            {BG_LOGO && (
                <div style={{
                    position: "fixed", inset: 0, zIndex: 0,
                    pointerEvents: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <img
                        src={BG_LOGO}
                        alt=""
                        style={{
                            width: "60vw", maxWidth: 520,
                            opacity: 0.09, objectFit: "contain",
                            userSelect: "none",
                        }}
                    />
                </div>
            )}

            {/* Card */}
            <div style={{
                background: "#fff",
                borderRadius: 24,
                padding: "36px 32px",
                width: "100%",
                maxWidth: 480,
                boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
                position: "relative",
                zIndex: 1,
            }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>💬</div>
                    <h1 style={{
                        margin: 0, fontWeight: 900, fontSize: 24,
                        letterSpacing: 2, textTransform: "uppercase", color: "#166534",
                    }}>
                        Customer Service
                    </h1>
                    <p style={{ margin: "8px 0 0", fontSize: 13, color: "#888", letterSpacing: 0.3 }}>
                        We'd love to hear from you. Fill in the form below!
                    </p>
                </div>

                {/* ── SUCCESS STATE ── */}
                {status === "success" && (
                    <div style={{ textAlign: "center", padding: "32px 16px", animation: "popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
                        <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
                        <div style={{ fontWeight: 900, fontSize: 20, color: "#166534", marginBottom: 6 }}>Message Sent!</div>
                        <div style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>We'll get back to you as soon as possible.</div>
                        <button
                            onClick={handleReset}
                            style={{
                                padding: "12px 32px", borderRadius: 10,
                                background: "#5dbb15", border: "none", color: "white",
                                fontWeight: 900, fontSize: 14, letterSpacing: 2,
                                cursor: "pointer", textTransform: "uppercase",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "#4aaa00"}
                            onMouseLeave={e => e.currentTarget.style.background = "#5dbb15"}
                        >
                            Send Another
                        </button>
                    </div>
                )}

                {/* ── ERROR STATE ── */}
                {status === "error" && (
                    <div style={{ textAlign: "center", padding: "24px 16px" }}>
                        <div style={{ fontSize: 48, marginBottom: 10 }}>❌</div>
                        <div style={{ fontWeight: 900, fontSize: 18, color: "#dc2626", marginBottom: 6 }}>Something went wrong</div>
                        <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Please check your internet connection and try again.</div>
                        <button
                            onClick={handleReset}
                            style={{
                                padding: "11px 28px", borderRadius: 10,
                                background: "#dc2626", border: "none", color: "white",
                                fontWeight: 900, fontSize: 13, letterSpacing: 1,
                                cursor: "pointer", textTransform: "uppercase",
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* ── FORM ── */}
                {(status === "idle" || status === "loading") && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                        {FIELDS.map(field => (
                            <div key={field.id}>
                                <label style={{
                                    display: "block", fontWeight: 700, fontSize: 12,
                                    letterSpacing: 1, textTransform: "uppercase",
                                    color: "#444", marginBottom: 6,
                                }}>
                                    {field.label}
                                    {field.required && <span style={{ color: "#5dbb15", marginLeft: 3 }}>*</span>}
                                </label>

                                {field.type === "textarea" ? (
                                    <textarea
                                        id={field.id}
                                        value={form[field.id]}
                                        onChange={handleChange}
                                        onFocus={() => setFocused(field.id)}
                                        onBlur={() => setFocused(null)}
                                        placeholder={field.placeholder}
                                        rows={4}
                                        style={{
                                            width: "100%", padding: "12px 14px",
                                            borderRadius: 10, fontSize: 14,
                                            border: focused === field.id ? "2px solid #5dbb15" : "2px solid #e5e7eb",
                                            outline: "none", resize: "vertical",
                                            fontFamily: "'Trebuchet MS', sans-serif",
                                            color: "#222", background: "#fafafa",
                                            transition: "border 0.2s", boxSizing: "border-box",
                                        }}
                                    />
                                ) : (
                                    <input
                                        id={field.id}
                                        type={field.type}
                                        value={form[field.id]}
                                        onChange={handleChange}
                                        onFocus={() => setFocused(field.id)}
                                        onBlur={() => setFocused(null)}
                                        placeholder={field.placeholder}
                                        style={{
                                            width: "100%", padding: "12px 14px",
                                            borderRadius: 10, fontSize: 14,
                                            border: focused === field.id ? "2px solid #5dbb15" : "2px solid #e5e7eb",
                                            outline: "none",
                                            fontFamily: "'Trebuchet MS', sans-serif",
                                            color: "#222", background: "#fafafa",
                                            transition: "border 0.2s", boxSizing: "border-box",
                                        }}
                                    />
                                )}
                            </div>
                        ))}

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={status === "loading"}
                            style={{
                                marginTop: 6, width: "100%", padding: "14px 0",
                                borderRadius: 12, border: "none", color: "white",
                                fontWeight: 900, fontSize: 15, letterSpacing: 2,
                                textTransform: "uppercase",
                                cursor: status === "loading" ? "not-allowed" : "pointer",
                                background: status === "loading" ? "#a3d977" : "#5dbb15",
                                transition: "background 0.2s",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            }}
                            onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "#4aaa00"; }}
                            onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.background = "#5dbb15"; }}
                        >
                            {status === "loading" ? (
                                <>
                                    <span style={{
                                        width: 18, height: 18,
                                        border: "3px solid rgba(255,255,255,0.4)",
                                        borderTop: "3px solid white", borderRadius: "50%",
                                        display: "inline-block",
                                        animation: "spin 0.8s linear infinite",
                                    }} />
                                    Sending...
                                </>
                            ) : (
                                <>📨 Send Message</>
                            )}
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}