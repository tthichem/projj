import React, { useState, useEffect } from "react";
import {
  CalculerMoyenneDuSemestre,
  CalculerMoyenneGenerale,
} from "../CalculerMoyenne";
import "./Afficher.css";
import { API_BASE_URL } from "../../utils/config";

const Afficher = ({ promoSelecte, promoRefs, theme }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({});
  const [semestreActive, setSemestreActive] = useState({});
  const [activeSpecialite, setActiveSpecialite] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/modules/get`);
        const data = await response.json();
        if (data.success) setModules(data.modules);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const toggleSemester = (systeme, anne, specialite, semester) => {
    setNotes((prev) => ({
      ...prev,
      [`${systeme}-${anne}-${specialite}-${semester}`]: {},
    }));
    setSemestreActive((prev) => ({
      ...prev,
      [`${systeme}-${anne}-${specialite}-${semester}`]:
        !prev[`${systeme}-${anne}-${specialite}-${semester}`],
    }));
  };

  const handleNoteChange = (
    systeme,
    anne,
    specialite,
    semester,
    NomModule,
    field,
    value
  ) => {
    setNotes((prev) => {
      const ModuleCourrant =
        prev[`${systeme}-${anne}-${specialite}-${semester}`]?.[NomModule] || {};
      const CoefCourrant =
        ModuleCourrant.coefficient ||
        modules.find((m) => m.name === NomModule)?.coefficient ||
        1;

      return {
        ...prev,
        [`${systeme}-${anne}-${specialite}-${semester}`]: {
          ...prev[`${systeme}-${anne}-${specialite}-${semester}`],
          [NomModule]: {
            ...ModuleCourrant,
            [field]: value === "" ? null : parseFloat(value),
            coefficient:
              field === "coefficient" ? parseFloat(value) : CoefCourrant,
          },
        },
      };
    });
  };

  const MoyenneGenerales = (systeme, anne, specialite) => {
    const CléS1 = `${systeme}-${anne}-${specialite}-1`;
    const CléS2 = `${systeme}-${anne}-${specialite}-2`;

    const S1Moy = notes[CléS1]
      ? CalculerMoyenneDuSemestre(notes[CléS1]).moyenne
      : null;
    const S2Moy = notes[CléS2]
      ? CalculerMoyenneDuSemestre(notes[CléS2]).moyenne
      : null;

    return {
      moyenne: CalculerMoyenneGenerale(S1Moy, S2Moy),
      show: semestreActive[CléS1] || semestreActive[CléS2],
    };
  };

  const organizer = (modules) => {
    return modules.reduce((acc, module) => {
      if (promoSelecte && module.anne !== promoSelecte) return acc;

      const systeme = module.systeme || "Général";
      if (!acc[systeme]) acc[systeme] = {};

      if (!acc[systeme][module.anne]) acc[systeme][module.anne] = {};
      if (!acc[systeme][module.anne][module.specialité])
        acc[systeme][module.anne][module.specialité] = {};

      if (!acc[systeme][module.anne][module.specialité][module.semester]) {
        acc[systeme][module.anne][module.specialité][module.semester] = [];
      }

      acc[systeme][module.anne][module.specialité][module.semester].push({
        name: module.name,
        link: module.google_drive_link,
        coefficient: module.coefficient || 1,
      });

      return acc;
    }, {});
  };

  const dataOrganize = organizer(modules);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={`afficher ${theme}`}>
      {Object.entries(dataOrganize).map(([systeme, promos]) => (
        <div key={systeme} className="systeme-card">
          <h1 className="systeme-title">{systeme}</h1>
          {Object.entries(promos).map(([anne, specialites]) => (
            <div
              key={anne}
              className="major-card"
              ref={(el) => (promoRefs.current[anne] = el)}
            >
              <h2 className="major-title">{anne}</h2>

              <div className="specialite-ga3">
                {Object.keys(specialites).length > 1 && (
                  <div className="specialite-nav">
                    {Object.keys(specialites).map((spec, index) => (
                      <button
                        key={spec}
                        className={`specialite-btn ${
                          activeSpecialite[anne] === spec ||
                          (!activeSpecialite[anne] && index === 0)
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setActiveSpecialite((prev) => ({
                            ...prev,
                            [anne]: spec,
                          }))
                        }
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                )}

                <div className="specialite-content">
                  {Object.entries(specialites).map(
                    ([specialite, semesters]) => {
                      const { moyenne: MoyenneG, show: AfficherMoyenneG } =
                        MoyenneGenerales(systeme, anne, specialite);

                      if (
                        activeSpecialite[anne] !== specialite &&
                        !(
                          activeSpecialite[anne] === undefined &&
                          Object.keys(specialites)[0] === specialite
                        )
                      ) {
                        return null;
                      }

                      return (
                        <div key={specialite} className="speciality-box">
                          <div className="speciality-header">
                            {AfficherMoyenneG && MoyenneG !== null && (
                              <div
                                className={`anne-moyenne ${
                                  MoyenneG < 10 ? "red" : "green"
                                }`}
                              >
                                General Average: <strong>{MoyenneG}</strong>
                              </div>
                            )}
                          </div>

                          <div className="semesters-container">
                            {Object.entries(semesters).map(
                              ([semester, modules]) => {
                                const CléSemestre = `${systeme}-${anne}-${specialite}-${semester}`;
                                const isActive = semestreActive[CléSemestre];
                                const NotesSemestre = notes[CléSemestre];
                                const MoyenneSemestre =
                                  CalculerMoyenneDuSemestre(NotesSemestre);

                                return (
                                  <div
                                    key={semester}
                                    className={`semester-box ${
                                      isActive ? "active" : ""
                                    }`}
                                  >
                                    <div className="semester-header">
                                      <h4>Semester {semester}</h4>
                                      <button
                                        className="toggle-btn"
                                        onClick={() =>
                                          toggleSemester(
                                            systeme,
                                            anne,
                                            specialite,
                                            semester
                                          )
                                        }
                                      >
                                        {isActive
                                          ? "Hide Notes"
                                          : "Enter Notes"}
                                      </button>
                                    </div>
                                    <hr />

                                    {modules.map((module, i) => (
                                      <div key={i}>
                                        {isActive ? (
                                          <h4 className="module-name">
                                            {module.name}
                                          </h4>
                                        ) : (
                                          <a
                                            className="module-link"
                                            href={module.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {module.name}
                                          </a>
                                        )}

                                        {isActive && (
                                          <div className="note-inputs">
                                            <input
                                              type="number"
                                              placeholder="Cours"
                                              required
                                              onInput={(e) => {
                                                if (e.target.value > 20)
                                                  e.target.value = 20;
                                                if (e.target.value < 0)
                                                  e.target.value = 0;
                                              }}
                                              onChange={(e) =>
                                                handleNoteChange(
                                                  systeme,
                                                  anne,
                                                  specialite,
                                                  semester,
                                                  module.name,
                                                  "cours",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <input
                                              type="number"
                                              placeholder="TD"
                                              onInput={(e) => {
                                                if (e.target.value > 20)
                                                  e.target.value = 20;
                                                if (e.target.value < 0)
                                                  e.target.value = 0;
                                              }}
                                              onChange={(e) =>
                                                handleNoteChange(
                                                  systeme,
                                                  anne,
                                                  specialite,
                                                  semester,
                                                  module.name,
                                                  "td",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <input
                                              type="number"
                                              placeholder="TP"
                                              onInput={(e) => {
                                                if (e.target.value > 20)
                                                  e.target.value = 20;
                                                if (e.target.value < 0)
                                                  e.target.value = 0;
                                              }}
                                              onChange={(e) =>
                                                handleNoteChange(
                                                  systeme,
                                                  anne,
                                                  specialite,
                                                  semester,
                                                  module.name,
                                                  "tp",
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <input
                                              type="number"
                                              placeholder="Coeff"
                                              onInput={(e) => {
                                                if (e.target.value > 7)
                                                  e.target.value = 7;
                                                if (e.target.value < 0)
                                                  e.target.value = 0;
                                              }}
                                              defaultValue={
                                                module.coefficient || 1
                                              }
                                              onChange={(e) =>
                                                handleNoteChange(
                                                  systeme,
                                                  anne,
                                                  specialite,
                                                  semester,
                                                  module.name,
                                                  "coefficient",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                        <hr />
                                      </div>
                                    ))}

                                    {isActive &&
                                      MoyenneSemestre.moyenne !== null && (
                                        <div
                                          className={`semester-moyenne ${
                                            MoyenneSemestre.moyenne < 10
                                              ? "red"
                                              : "green"
                                          }`}
                                        >
                                          <strong>Semester Average:</strong>{" "}
                                          {MoyenneSemestre.moyenne}
                                        </div>
                                      )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Afficher;
