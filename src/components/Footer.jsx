export default function SpriteFooter() {
    return (
        <footer id="footer"
            style={{
                background: "#5dbb15",
                fontFamily: "'Trebuchet MS', sans-serif",
                borderTop: "2px solid rgba(255,255,255,0.25)",
                padding: "18px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
            }}
        >
            <span
                style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                }}
            >
                © 2026 Sprite Fan Site made by :abinbaby — Educational Purposes Only
            </span>
            <span
                style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    maxWidth: 460,
                    textAlign: "right",
                    lineHeight: 1.6,
                }}
            >
                Sprite® is a registered trademark of The Coca-Cola Company. Not affiliated with or endorsed by Sprite® or The Coca-Cola Company.
            </span>
        </footer>
    );
}