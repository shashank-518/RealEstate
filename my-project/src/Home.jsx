import { useState } from "react";
import MapView from "./Mapview";

// ── Mock data (matches your actual API response shape) ──────────────────────
const MOCK_RESPONSE = {
  summary:
    "NestIQ recommends Kengeri, Hoodi/Kadugodi (Whitefield Extension), and KR Puram as top locations for a 2 BHK apartment under ₹50 lakhs, close to IT hubs and with excellent metro connectivity. These areas offer a blend of affordability, strong infrastructure, and potential for appreciation, perfectly suiting your requirements.",
  locations: [
    {
      name: "Kengeri",
      metro: "Kengeri / Kengeri Bus Terminal (Purple Line)",
      aqi: 65,
      crime_rating: "Low",
      future_growth: "High",
      livability_score: 8,
      why_best:
        "Direct metro connectivity (Purple Line), proximity to Global Village Tech Park and Mysore Road IT corridor, and high availability of 2 BHK apartments under ₹50 lakhs make it ideal for budget-conscious IT professionals.",
    },
    {
      name: "Hoodi / Kadugodi",
      metro: "Kadugodi Tree Park / Whitefield (Varthur Road) (Purple Line)",
      aqi: 75,
      crime_rating: "Medium",
      future_growth: "High",
      livability_score: 7.5,
      why_best:
        "Offers a strategic location near Whitefield's major IT hubs, with direct Purple Line metro access at a more affordable price point compared to core Whitefield, fitting the under ₹50 lakh budget for a 2 BHK.",
    },
    {
      name: "KR Puram",
      metro: "KR Puram (Purple Line)",
      aqi: 80,
      crime_rating: "Medium",
      future_growth: "High",
      livability_score: 7,
      why_best:
        "Unbeatable connectivity via ORR, metro interchange, and railway, providing quick access to multiple IT hubs. Offers excellent value for money for 2 BHK apartments within the specified budget.",
    },
  ],
  properties: [
    {
      id: "kengeri-apt-001",
      title: "Compact 2 BHK in Kengeri, near Metro",
      type: "apartment",
      price_lakhs: 42.5,
      area_sqft: 920,
      bhk: 2,
      location: "Kengeri",
      nearby: {
        school: "Orchids The International School",
        metro: "Kengeri Metro Station (1.5 km)",
        hospital: "BGS Gleneagles Global Hospital",
      },
      amenities: ["24/7 security", "power backup", "children's play area", "lift"],
      furnishing: "semi-furnished",
      investment_score: 8,
      reason:
        "Strategically located just 1.5 km from Kengeri Metro, offering easy commutes to IT hubs. Priced well within your budget, it's perfect for IT professionals seeking convenience and affordability with good future appreciation.",
    },
    {
      id: "kengeri-apt-004",
      title: "Brand New 2 BHK in a Gated Community, Kengeri",
      type: "apartment",
      price_lakhs: 48,
      area_sqft: 1020,
      bhk: 2,
      location: "Kengeri",
      nearby: {
        school: "RNS Institute of Technology",
        metro: "Kengeri Bus Terminal Metro (2 km)",
        hospital: "Rajeshwari Hospital",
      },
      amenities: ["gym", "clubhouse", "swimming pool", "indoor games", "security"],
      furnishing: "unfurnished",
      investment_score: 9,
      reason:
        "A newly built 2 BHK offering modern amenities within a gated community. Its proximity to the upcoming metro extension and Global Village Tech Park ensures both comfortable living and strong investment potential within your budget.",
    },
    {
      id: "hoodi-apt-002",
      title: "Modern 2 BHK near Hoodi Circle, Whitefield",
      type: "apartment",
      price_lakhs: 49,
      area_sqft: 1050,
      bhk: 2,
      location: "Hoodi / Kadugodi",
      nearby: {
        school: "DPS Whitefield",
        metro: "Kadugodi Tree Park Metro (2.5 km)",
        hospital: "Manipal Hospital Whitefield",
      },
      amenities: ["gym", "swimming pool", "clubhouse", "covered parking"],
      furnishing: "unfurnished",
      investment_score: 7,
      reason:
        "Located close to Whitefield's IT corridors and with improving metro access, this spacious 2 BHK offers excellent value. Amenities and proximity to workplaces justify the budget for a quick move-in.",
    },
    {
      id: "hoodi-apt-005",
      title: "Cozy 2 BHK for IT Professionals near ITPL",
      type: "apartment",
      price_lakhs: 46.5,
      area_sqft: 950,
      bhk: 2,
      location: "Hoodi / Kadugodi",
      nearby: {
        school: "Vydehi School of Excellence",
        metro: "Whitefield (Varthur Road) Metro (3 km)",
        hospital: "Columbia Asia Hospital Whitefield",
      },
      amenities: ["lift", "parking", "security", "kids play area"],
      furnishing: "fully-furnished",
      investment_score: 7,
      reason:
        "This fully-furnished 2 BHK is ideal for immediate occupancy, reducing initial setup costs. Its location offers easy access to ITPL and other Whitefield tech parks.",
    },
    {
      id: "krpuram-apt-003",
      title: "Well-connected 2 BHK in KR Puram",
      type: "apartment",
      price_lakhs: 45,
      area_sqft: 980,
      bhk: 2,
      location: "KR Puram",
      nearby: {
        school: "New Horizon International School",
        metro: "KR Puram Metro Station (1 km)",
        hospital: "Sakra World Hospital (via ORR)",
      },
      amenities: ["intercom", "24/7 power backup", "maintenance staff", "garden"],
      furnishing: "semi-furnished",
      investment_score: 8,
      reason:
        "With KR Puram Metro Station just 1 km away, this property offers unparalleled connectivity to various parts of Bangalore, including major IT hubs.",
    },
    {
      id: "krpuram-apt-006",
      title: "Spacious 2 BHK near ORR and KR Puram Lake",
      type: "apartment",
      price_lakhs: 47,
      area_sqft: 1080,
      bhk: 2,
      location: "KR Puram",
      nearby: {
        school: "Brigade School, Mahadevapura",
        metro: "KR Puram Metro Station (1.8 km)",
        hospital: "KC General Hospital",
      },
      amenities: ["balcony", "modular kitchen", "gated community", "gym"],
      furnishing: "semi-furnished",
      investment_score: 8,
      reason:
        "Offering more space and a peaceful environment near KR Puram Lake, still within walking distance of the metro with quick access to ORR's IT corridors. A great long-term home within budget.",
    },
  ],
};

// ── Filter config ────────────────────────────────────────────────────────────
const FILTERS = {
  type: {
    label: "Property Type",
    options: ["Apartment", "Villa", "Plot / Land", "Commercial", "Penthouse"],
  },
  config: {
    label: "Configuration",
    options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"],
  },
  features: {
    label: "Connectivity & Lifestyle",
    options: ["Near Metro", "Gated Community", "Swimming Pool", "Parking", "Smart Home", "School Nearby", "Hospital Nearby"],
  },
  budget: {
    label: "Budget Range",
    options: ["Under ₹50L", "₹50L – 1 Cr", "₹1 Cr – 2 Cr", "₹2 Cr – 5 Cr", "Above ₹5 Cr"],
  },
};

const STATS = [
  { num: "12,400+", label: "Properties Listed" },
  { num: "840+", label: "Verified Builders" },
  { num: "6,200+", label: "Happy Families" },
  { num: "18", label: "Cities Covered" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function crimeConfig(rating) {
  if (rating === "Low") return { bg: "#d1fae5", color: "#065f46", label: "Low Crime" };
  if (rating === "Medium") return { bg: "#fef3c7", color: "#92400e", label: "Medium Crime" };
  return { bg: "#fee2e2", color: "#991b1b", label: "High Crime" };
}

function furnishConfig(f) {
  if (f === "fully-furnished") return { bg: "#d1fae5", color: "#065f46", label: "Fully Furnished" };
  if (f === "semi-furnished") return { bg: "#dbeafe", color: "#1e40af", label: "Semi Furnished" };
  return { bg: "#f3f4f6", color: "#374151", label: "Unfurnished" };
}

// ── Icons ────────────────────────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconMetro = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);
const IconPin = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconWind = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1111 8H2" /><path d="M12.6 19.4A2 2 0 1014 16H2" />
  </svg>
);

// ── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span style={{
      display: "inline-block", width: 15, height: 15,
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "#fff", borderRadius: "50%",
      animation: "nestiq-spin 0.7s linear infinite", flexShrink: 0,
    }} />
  );
}

// ── Loading dots ─────────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 7, marginBottom: 14 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 9, height: 9, borderRadius: "50%", background: "#B8954A", display: "block",
            animation: `nestiq-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>
        NestIQ is finding your perfect properties…
      </p>
    </div>
  );
}

// ── Location card ─────────────────────────────────────────────────────────────
function LocationCard({ loc }) {
  const crime = crimeConfig(loc.crime_rating);
  const barWidth = `${(loc.livability_score / 10) * 100}%`;
  return (
    <div style={{
      background: "#fff", border: "0.5px solid #e8e4db", borderRadius: 14,
      padding: "1.1rem", display: "flex", flexDirection: "column", gap: 0,
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#B8954A"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e4db"}
    >
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A18", marginBottom: 8 }}>
        {loc.name}
      </div>

      {/* Metro */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 5 }}>
        <span style={{ color: "#B8954A", marginTop: 1, flexShrink: 0 }}><IconMetro /></span>
        <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{loc.metro}</span>
      </div>

      {/* AQI */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <span style={{ color: "#9ca3af", flexShrink: 0 }}><IconWind /></span>
        <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>AQI {loc.aqi}</span>
      </div>

      {/* Livability bar */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ height: 4, background: "#f0ede6", borderRadius: 2 }}>
          <div style={{ height: 4, width: barWidth, background: "#B8954A", borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>
        <span>Livability</span><span style={{ color: "#B8954A", fontWeight: 500 }}>{loc.livability_score}/10</span>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: crime.bg, color: crime.color, fontFamily: "'DM Sans', sans-serif" }}>
          {crime.label}
        </span>
        <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "#dbeafe", color: "#1e40af", fontFamily: "'DM Sans', sans-serif" }}>
          {loc.future_growth} Growth
        </span>
      </div>

      {/* Why best */}
      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, paddingTop: 10, borderTop: "0.5px solid #f0ede6", fontFamily: "'DM Sans', sans-serif" }}>
        {loc.why_best}
      </div>
    </div>
  );
}

// ── Property card ─────────────────────────────────────────────────────────────
function PropertyCard({ prop }) {
  const furnish = furnishConfig(prop.furnishing);
  const scoreColor = prop.investment_score >= 8 ? "#065f46" : prop.investment_score >= 6 ? "#92400e" : "#6b7280";
  const scoreBg = prop.investment_score >= 8 ? "#d1fae5" : prop.investment_score >= 6 ? "#fef3c7" : "#f3f4f6";

  return (
    <div style={{
      background: "#fff", border: "0.5px solid #e8e4db", borderRadius: 14,
      padding: "1.1rem", display: "flex", flexDirection: "column",
      transition: "border-color 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#B8954A"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(184,149,74,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e4db"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 20, background: "#f7f4ee", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
          {prop.type}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, padding: "3px 9px", borderRadius: 20, background: scoreBg, color: scoreColor, fontFamily: "'DM Sans', sans-serif" }}>
          <IconStar /> {prop.investment_score}/10
        </span>
      </div>

      {/* Title */}
      <div style={{ fontSize: 13, fontWeight: 500, color: "#1A1A18", lineHeight: 1.4, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
        {prop.title}
      </div>

      {/* Location */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9ca3af", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
        <IconPin /> {prop.location}
      </div>

      {/* Price & area */}
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 400, color: "#1A1A18", marginBottom: 2 }}>
        ₹{prop.price_lakhs} L
      </div>
      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
        {prop.area_sqft} sq ft · {prop.bhk} BHK
      </div>

      {/* Furnishing pill */}
      <span style={{ display: "inline-block", fontSize: 11, padding: "3px 9px", borderRadius: 20, background: furnish.bg, color: furnish.color, marginBottom: 10, fontFamily: "'DM Sans', sans-serif", alignSelf: "flex-start" }}>
        {furnish.label}
      </span>

      {/* Nearby */}
      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.65, padding: "8px 10px", background: "#f9f7f3", borderRadius: 8, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ fontWeight: 500, color: "#1A1A18" }}>Metro</span> {prop.nearby.metro}<br />
        <span style={{ fontWeight: 500, color: "#1A1A18" }}>School</span> {prop.nearby.school}<br />
        <span style={{ fontWeight: 500, color: "#1A1A18" }}>Hospital</span> {prop.nearby.hospital}
      </div>

      {/* Amenities */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
        {prop.amenities.map(a => (
          <span key={a} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "#f3f4f6", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
            {a}
          </span>
        ))}
      </div>

      {/* Reason */}
      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, paddingTop: 10, borderTop: "0.5px solid #f0ede6", fontFamily: "'DM Sans', sans-serif", marginTop: "auto" }}>
        {prop.reason}
      </div>
    </div>
  );
}

// ── Results section ───────────────────────────────────────────────────────────
function Results({ data }) {
  // group properties by location
  const byLoc = {};
  (data.properties || []).forEach(p => {
    if (!byLoc[p.location]) byLoc[p.location] = [];
    byLoc[p.location].push(p);
  });

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto 0" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "#1A1A18" }}>
          Recommended Properties
        </h2>
        <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>
          {data.properties?.length} properties across {data.locations?.length} localities
        </p>
      </div>

      

      {/* AI Summary */}
      <div style={{ background: "#fff", border: "0.5px solid rgba(184,149,74,0.3)", borderLeft: "2.5px solid #B8954A", borderRadius: "0 10px 10px 0", padding: "1rem 1.25rem", marginBottom: "1.75rem" }}>
        <p style={{ fontSize: 13, color: "#4A4A44", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{data.summary}</p>
      </div>

      {/* Localities */}
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8954A", marginBottom: "0.9rem", paddingBottom: "0.5rem", borderBottom: "0.5px solid rgba(184,149,74,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
        Top Localities
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: "2rem" }}>
        {(data.locations || []).map(loc => <LocationCard key={loc.name} loc={loc} />)}
      </div>

      {/* Properties grouped by locality */}
      {Object.entries(byLoc).map(([locName, props]) => (
        <div key={locName} style={{ marginBottom: "1.75rem" }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8954A", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "0.5px solid rgba(184,149,74,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
            {locName}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
            {props.map(p => <PropertyCard key={p.id} prop={p} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Home() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({ type: [], config: [], features: [], budget: [] });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const togglePill = (group, value) => {
    setSelected(prev => {
      const cur = prev[group];
      return {
        ...prev,
        [group]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value],
      };
    });
  };

  const handleSearch = async () => {
    if (!query.trim()) { setError(true); return; }
    setError(false);
    setLoading(true);
    setResults(null);

    const payload = {
      userQuery: query.trim(),
      filters: {
        propertyType: selected.type,
        configuration: selected.config,
        features: selected.features,
        budget: selected.budget,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResults(data);
    } catch {
      // Fallback to mock data when backend not available
      await new Promise(r => setTimeout(r, 1400));
      setResults(MOCK_RESPONSE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes nestiq-spin { to { transform: rotate(360deg); } }
        @keyframes nestiq-pulse { 0%,80%,100%{transform:scale(.7);opacity:.4;} 40%{transform:scale(1);opacity:1;} }
        @keyframes nestiq-fadein { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .nestiq-root { font-family: 'DM Sans', sans-serif; background: #FAF8F4; color: #1A1A18; min-height: 100vh; padding: 3rem 1.5rem 5rem; }
        .nestiq-input { width: 100%; padding: 13px 16px; border: 0.5px solid #E8E4DB; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1A1A18; background: #FAF8F4; outline: none; transition: border-color 0.2s; }
        .nestiq-input:focus { border-color: #B8954A; }
        .nestiq-input.err { border-color: #c0392b; }
        .nestiq-input::placeholder { color: #c4bfb5; }
        .nestiq-pill { padding: 7px 15px; border: 0.5px solid #E8E4DB; border-radius: 20px; font-size: 13px; font-weight: 400; color: #4A4A44; background: #FAF8F4; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .nestiq-pill:hover { border-color: #B8954A; color: #B8954A; }
        .nestiq-pill.on { background: #1A1A18; border-color: #1A1A18; color: #fff; }
        .nestiq-btn { padding: 13px 32px; background: #1A1A18; color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.04em; cursor: pointer; transition: background 0.2s, transform 0.1s; display: flex; align-items: center; gap: 8px; min-width: 180px; justify-content: center; }
        .nestiq-btn:hover:not(:disabled) { background: #B8954A; }
        .nestiq-btn:active:not(:disabled) { transform: scale(0.97); }
        .nestiq-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .nestiq-results-anim { animation: nestiq-fadein 0.4s ease both; }
      `}</style>

      <div className="nestiq-root">
        {/* Header */}
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", color: "#B8954A", textTransform: "uppercase", textAlign: "center", marginBottom: "1rem" }}>
          Premium Real Estate
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 6vw, 3.8rem)", fontWeight: 300, lineHeight: 1.1, textAlign: "center", color: "#1A1A18", marginBottom: "0.4rem" }}>
          Find Your <em style={{ fontStyle: "italic", color: "#B8954A" }}>Perfect</em>
          <br />Property
        </h1>
        <p style={{ fontSize: 14, color: "#4A4A44", textAlign: "center", marginBottom: "2.5rem", fontWeight: 300 }}>
          Describe what you're looking for, or select from curated options below
        </p>

        {/* Search card */}
        <div style={{ background: "#fff", border: "0.5px solid rgba(184,149,74,0.25)", borderRadius: 16, padding: "1.75rem", maxWidth: 800, margin: "0 auto", boxShadow: "0 4px 40px rgba(26,26,24,0.06)" }}>
          <label style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B8954A", display: "block", marginBottom: "0.6rem" }}>
            What are you looking for? <span style={{ color: "#c0392b" }}>*</span>
          </label>
          <input
            className={`nestiq-input${error ? " err" : ""}`}
            type="text"
            placeholder="e.g. 2 BHK near metro under ₹50L in Bengaluru…"
            value={query}
            onChange={e => { setQuery(e.target.value); if (e.target.value.trim()) setError(false); }}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          {error && <span style={{ fontSize: 12, color: "#c0392b", marginTop: 6, display: "block" }}>Please describe what you're looking for before searching.</span>}

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "1.5rem 0 1.25rem" }}>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(184,149,74,0.25)" }} />
            <span style={{ fontSize: 11, color: "#b0aca3", letterSpacing: "0.08em" }}>Optionally refine your search</span>
            <div style={{ flex: 1, height: "0.5px", background: "rgba(184,149,74,0.25)" }} />
          </div>

          {/* Filters */}
          {Object.entries(FILTERS).map(([group, { label, options }]) => (
            <div key={group} style={{ marginBottom: "1.1rem" }}>
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4A44", display: "block", marginBottom: "0.5rem" }}>
                {label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {options.map(opt => (
                  <button
                    key={opt}
                    className={`nestiq-pill${selected[group].includes(opt) ? " on" : ""}`}
                    onClick={() => togglePill(group, opt)}
                    type="button"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
            <button className="nestiq-btn" onClick={handleSearch} disabled={loading} type="button">
              {loading ? <><Spinner /><span>Searching…</span></> : <><span>Search Properties</span><IconSearch /></>}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <LoadingDots />
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div className="nestiq-results-anim">
            <Results data={results} />
          </div>
        )}

        

        {/* Stats — hide when results showing */}
        {!results && !loading && (
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "0.5px solid rgba(184,149,74,0.25)", flexWrap: "wrap", maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
            {STATS.map(({ num, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 400, color: "#1A1A18", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, color: "#b0aca3", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}