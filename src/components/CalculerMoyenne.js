export const CalculerMoyenneDuModule = (NotesModule) => {
    if (!NotesModule || NotesModule.cours === null || NotesModule.cours === undefined) return 0;

    const cours = NotesModule.cours;
    const td = NotesModule.td;
    const tp = NotesModule.tp;
    const coefficient = NotesModule.coefficient || 1;

    const hasTD = td !== null && td !== undefined;
    const hasTP = tp !== null && tp !== undefined;

    let MoyenneTdEtTp = 0;
    let TdEtTpcount = 0;

    if (hasTD) {
        MoyenneTdEtTp += td;
        TdEtTpcount++;
    }
    if (hasTP) {
        MoyenneTdEtTp += tp;
        TdEtTpcount++;
    }

    let NoteFinale;
    if (TdEtTpcount > 0) {
        MoyenneTdEtTp = MoyenneTdEtTp / TdEtTpcount;
        NoteFinale = (cours * 0.6 + MoyenneTdEtTp * 0.4) * coefficient;
    } else {
        NoteFinale = cours * coefficient;
    }

    return NoteFinale;
};

export const CalculerMoyenneDuSemestre = (NotesSemestre) => {
    if (!NotesSemestre) return { moyenne: null, totalCoefficients: 0 };

    let TotalModuleAvecCoef = 0;
    let totalCoefficients = 0;

    Object.entries(NotesSemestre).forEach(([_, NotesModule]) => {
        if (NotesModule.cours === null || NotesModule.cours === undefined) return;

        const coefficient = NotesModule.coefficient || 1;
        const ModuleAvecCoef = CalculerMoyenneDuModule(NotesModule);

        TotalModuleAvecCoef += ModuleAvecCoef;
        totalCoefficients += coefficient;
    });

    return {
        moyenne: totalCoefficients > 0 ? (TotalModuleAvecCoef / totalCoefficients).toFixed(2) : null,
        totalCoefficients
    };
};

export const CalculerMoyenneGenerale = (S1Moy, S2Moy) => {
    if (S1Moy === null && S2Moy === null) return null;

    const moy1 = S1Moy !== null ? parseFloat(S1Moy) : 0;
    const moy2 = S2Moy !== null ? parseFloat(S2Moy) : 0;

    const count = (S1Moy !== null ? 1 : 0) + (S2Moy !== null ? 1 : 0);

    return count > 0 ? ((moy1 + moy2) / count).toFixed(2) : null;
};
