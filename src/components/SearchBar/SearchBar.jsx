import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import { IoMdClose } from "react-icons/io";
import { API_BASE_URL } from "../../utils/config";

const SearchBar = ({ theme }) => {
  const [Recherche, setRecherche] = useState("");
  const [Rsultat, setRsultat] = useState(false);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const detect = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${API_BASE_URL}/api/modules/get`);

        let data = response.data;

        if (Array.isArray(data)) {
          setModules(modulesFormate(data));
          return;
        }

        if (data && typeof data === "object") {
          const dataPossible = ["data", "modules"];
          for (const prop of dataPossible) {
            if (Array.isArray(data[prop])) {
              setModules(modulesFormate(data[prop]));
              return;
            }
          }
        }

        throw new Error("la structure depuis database n'est pas expectée");
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const modulesFormate = (modulesArray) => {
      return modulesArray.map((module) => ({
        name: module.name || "",
        systeme: module.systeme || "",
        anne: module.anne || "",
        specialite: module.specialité || null,
        semester: module.semester || "",
        link: module.google_drive_link || "#",
        motARecherche: `${module.anne || ""} ${module.specialité || ""} ${
          module.name || ""
        }`
          .toLowerCase()
          .trim(),
        resultat: `${module.anne || ""}${
          module.specialité ? "/" + module.specialité : ""
        } - ${module.name || ""}`,
      }));
    };

    fetchModules();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (detect.current && !detect.current.contains(e.target)) {
        setRsultat(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredModules = modules.filter((mod) =>
    mod.motARecherche.includes(Recherche.toLowerCase())
  );
  const handleClear = () => {
    setRecherche("");
  };
  return (
    <div
      className={`recherche-container ${theme} ${isFocused ? "focused" : ""}`}
      ref={detect}
    >
      {loading && <div className="loading">Loading modules...</div>}
      {error && <div className="error">Error: {error}</div>}

      <input
        type="text"
        placeholder="Ex: L3 ISIL Génie Logiciel"
        value={Recherche}
        onChange={(e) => {
          setRecherche(e.target.value);
          setRsultat(true);
        }}
        className={`recherche-input ${theme}`}
      />
      {Recherche && (
        <button className="clear-button" onClick={handleClear}>
          <IoMdClose size={20} />
        </button>
      )}

      {Recherche && Rsultat && (
        <ul className={`resultat-list ${theme}`}>
          {filteredModules.slice(0, 6).map((mod, index) => (
            <li
              key={`${mod.anne}-${mod.specialite}-${mod.name}-${index}`}
              className="resultat-item"
            >
              <a
                href={mod.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`resultat-link ${theme}`}
              >
                {mod.resultat}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
