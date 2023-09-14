import { prisBetonTegl, prisEternitTag, prisLevendeTag, prisSolcelleTag, prisStaalTag, prisStraaTag, prisTagPap, prisTeglTag } from "./prices";

export function beregnTagareal(tagVinkel, boligGrundPlan) {
    let tagFlade;
    // Konverterer tagvinklen til radianer
    let vinkelRadianer = (tagVinkel * Math.PI) / 180;

    // Beregner cosinus af tagvinklen
    let cosTagvinkel = Math.cos(vinkelRadianer);

    // Beregner tagarealet
    let tagareal = boligGrundPlan / cosTagvinkel;

    // Returnerer tagarealet
    tagareal = Math.round(tagareal);
    tagFlade = tagareal;
    return tagFlade;
}

export function calculateNewRoof(oldRoof, tagAreal, hojdeTilTagrende, tagKviste, newTagKviste, tagrender, udhaeng) {
    let prisNedtagning = 0;
    let pris = 0;
    // Beregner pris for nedtagning af gammelt tag
    if (oldRoof) {
        prisNedtagning = tagAreal * 200;
    }
    pris = prisNedtagning + (tagKviste * 5000) + (newTagKviste * 20000);
    if (tagrender) {
        pris += 18000;
    }
    if (udhaeng) {
        pris += 15000;
    }
    return { pris, tagAreal };
}

export function calculateRoofPrice(tagareal, nyTagType) {
    let samletPris = 0;
    switch (nyTagType) {
        case 1:
            samletPris = tagareal * prisTeglTag;
            break;
        case 2:
            samletPris = tagareal * prisStaalTag;
            break;
        case 3:
            samletPris = tagareal * prisBetonTegl;
            break;
        case 4:
            samletPris = tagareal * prisTagPap;
            break;
        case 5:
            samletPris = tagareal * prisEternitTag;
            break;
        case 6:
            samletPris = tagareal * prisStraaTag;
            break;
        case 7:
            samletPris = tagareal * prisLevendeTag;
            break;
        case 8:
            samletPris = tagareal * prisSolcelleTag;
            break;
        default:
            break;
    }
    return samletPris;
}
export const addThousandsSeparator = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export async function BBRData(search) {
    let grundData;
    let adresseID;
    let adresse;
    let by;
    let postnummer;
    let bygninger;
    let bolig;
    let boligGrundPlan;
    let kælder;
    let tagType;
    let tagTypeTekst;
    let stuehus;
    let etager;
    let etageAntal;
    let tagEtageAreal;
    let tagVinkel;
    let fladtTag;
    let tagAargang;
    let tagFladeAreal;
    let højdeTilTagrende;

    const getGrundData = async (search) => {
        // Convert search to string
        search = search.toString();
        //Make space to - in search
        search = search.replace(" ", "-");
        const url = "https://api.dataforsyningen.dk/adresser?q=" + search;
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                console.error("Error:", res.status);
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getBoligData = async () => {
        const url =
            "https://services.datafordeler.dk/BBR/BBRPublic/1/rest/bygning?username=LMQRTEJYRQ&password=TmmycgtX-1303&Format=JSON&Husnummer=" +
            adresseID;
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                if (data.length == 0) {
                    console.log("No data found");
                    return null;
                }
                //If there is data, then set the data
                return data;
            } else {
                console.error("Error:", res.status);
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const findBoligPåGrund = async () => {
        let størsteBygning = null;

        bygninger.forEach((element) => {
            //Find ud af om bygningen har et Bygningsnummer hvis ikke så gå videre til næste bygning
            if (!element.byg007Bygningsnummer) {
                return;
            }
            if (
                !størsteBygning ||
                element.byg049SamletBygningsareal > størsteBygning.byg049SamletBygningsareal
            ) {
                størsteBygning = element;
            }

        });
        return størsteBygning;
    };

    async function tjekKælder() {
        //Find ud af om der er kælder i huset
        let kælder = false;
        if (bolig.etageList && Array.isArray(bolig.etageList)) {
            bolig.etageList.forEach((element) => {
                //Find etagen der har typen "kl", hvis den findes.
                if (element.etage.eta006BygningensEtagebetegnelse == "kl") {
                    kælder = true;
                }
            });
        }
        return kælder;
    }

    async function findTagmateriale() {
        let nuvTagType = 0;
        let nuvTagTypeTekst = "";
        let fladttag = false;
        if (bolig.byg033Tagdækningsmateriale == 1) {
            nuvTagType = 1;
            nuvTagTypeTekst = "Tagpap med ingen eller lille hældning";
            fladttag = true;
        } else if (bolig.byg033Tagdækningsmateriale == "2") {
            nuvTagType = 2;
            nuvTagTypeTekst = "Tagpap med stor hældning";
        } else if (bolig.byg033Tagdækningsmateriale == "3") {
            nuvTagType = 3;
            nuvTagTypeTekst = "Fibercement herunder asbest";
        } else if (bolig.byg033Tagdækningsmateriale == "4") {
            nuvTagType = 4;
            nuvTagTypeTekst = "Betontagsten";
        } else if (bolig.byg033Tagdækningsmateriale == "5") {
            nuvTagType = 5;
            nuvTagTypeTekst = "Tegl";
        } else if (bolig.byg033Tagdækningsmateriale == "6") {
            nuvTagType = 6;
            nuvTagTypeTekst = "Metal";
        } else if (bolig.byg033Tagdækningsmateriale == "7") {
            nuvTagType = 7;
            nuvTagTypeTekst = "Stråtag";
        } else if (bolig.byg033Tagdækningsmateriale == "10") {
            nuvTagType = 10;
            nuvTagTypeTekst = "Fibercement uden asbest";
        } else if (bolig.byg033Tagdækningsmateriale == "11") {
            nuvTagType = 11;
            nuvTagTypeTekst = "Plastmaterialer";
        } else if (bolig.byg033Tagdækningsmateriale == "12") {
            nuvTagType = 12;
            nuvTagTypeTekst = "Glas";
        } else if (bolig.byg033Tagdækningsmateriale == "20") {
            nuvTagType = 20;
            nuvTagTypeTekst = "Levende tage";
        } else if (bolig.byg033Tagdækningsmateriale == "80") {
            nuvTagType = 80;
            nuvTagTypeTekst = "Ingen";
        } else if (bolig.byg033Tagdækningsmateriale == "90") {
            nuvTagType = 90;
            nuvTagTypeTekst = "Andet materiale";
        }
        return [nuvTagType, nuvTagTypeTekst, fladttag];
    }

    const findBoligEtager = async () => {
        let etager = 0;
        let stuehus = false;
        if (!bolig.etageList) {
            stuehus = true;
        } else if (Array.isArray(bolig.etageList) && bolig.etageList.length === 1) {
            stuehus = true;
        } else if (Array.isArray(bolig.etageList) && bolig.etageList.length > 1) {
            stuehus = false;
        }
        if (kælder && Array.isArray(bolig.etageList)) {
            etager = bolig.etageList.length - 1;
        } else if (Array.isArray(bolig.etageList)) {
            etager = bolig.etageList.length;
        }
        return [etager, stuehus];
    };

    async function findTagetageAreal() {
        let tagetageAreal = 0;
        //Find tagetage areal
        if (bolig.byg054AntalEtager == 0) {
            //Hvis der ikke er nogle etager i boligen, så findes der ikke noget tagetage areal
        } else if (Array.isArray(bolig.etageList)) {
            bolig.etageList.forEach((element) => {
                //Find etagen der har typen 1
                if (element.etage.eta025Etagetype == "1") {
                    //Find areal af tagetagen
                    tagetageAreal = element.etage.eta020SamletArealAfEtage;
                }
            });
            //Hvis der er etager i boligen, så findes der tagetage areal
        }
        return tagetageAreal;
    }

    async function beregnTagvinkel() {
        let tagvinkel = 0;
        //Beregn tagvinkel
        if (stuehus) {
            tagvinkel = 25;

            if (fladtTag) {
                tagvinkel = 0;
            }
        } else if (!stuehus && tagEtageAreal > 0 && tagEtageAreal < boligGrundPlan && !fladtTag) {
            tagvinkel = 45;
        } else if (!stuehus && fladtTag) {
            tagvinkel = 0;
        } else {
            tagvinkel = 25;
        }
        return tagvinkel;
    }

    async function findHøjdeTagfod() {
        let højdeTagfod = 0;
        //Find bolighøjde
        //Hvis der er kælder i huset skal der lægges 1 til højden
        if(!bolig.byg054AntalEtager) {
            højdeTagfod = 2.5;
        } else if (kælder) {
            højdeTagfod = bolig.byg054AntalEtager * 2.5 + 1;
        }
        //Hvis der ikke er kælder i huset skal der ikke lægges 1 til højden
        else {
            højdeTagfod = bolig.byg054AntalEtager * 2.5;
        }
        return højdeTagfod;
    }

    async function beregnTagareal() {
        let tagFlade;
        // Konverterer tagvinklen til radianer
        let vinkelRadianer = (tagVinkel * Math.PI) / 180;

        // Beregner cosinus af tagvinklen
        let cosTagvinkel = Math.cos(vinkelRadianer);

        // Beregner tagarealet
        let tagareal = boligGrundPlan / cosTagvinkel;

        // Returnerer tagarealet
        tagareal = Math.round(tagareal);
        tagFlade = tagareal;
        return tagFlade;
    }

    grundData = await getGrundData(search);
    adresseID = grundData[0].adgangsadresse.id;
    postnummer = grundData[0].adgangsadresse.postnummer.nr;
    by = grundData[0].adgangsadresse.postnummer.navn;
    adresse =
        grundData[0].adgangsadresse.vejstykke.navn +
        " " +
        grundData[0].adgangsadresse.husnr +
        ", " +
        grundData[0].adgangsadresse.postnummer.nr +
        " " +
        grundData[0].adgangsadresse.postnummer.navn;

    bygninger = await getBoligData();
    if (bygninger) {
        bolig = await findBoligPåGrund();
        boligGrundPlan = bolig.byg041BebyggetAreal;
        tagAargang = bolig.byg026Opførelsesår;
        kælder = await tjekKælder();
        tagType = await findTagmateriale().then((tagType) => {
            return tagType[0];
        });
        tagTypeTekst = await findTagmateriale().then((tagType) => {
            return tagType[1];
        });
        fladtTag = await findTagmateriale().then((tagType) => {
            return tagType[2];
        });
        etager = await findBoligEtager();
        etageAntal = etager[0];
        stuehus = etager[1];
        tagEtageAreal = await findTagetageAreal();
        tagVinkel = await beregnTagvinkel();
        tagFladeAreal = await beregnTagareal();
        højdeTilTagrende = await findHøjdeTagfod();
        return {
            adresseID,
            adresse,
            boligGrundPlan,
            kælder,
            tagType,
            tagTypeTekst,
            etageAntal,
            stuehus,
            tagVinkel,
            tagFladeAreal,
            højdeTilTagrende,
            tagAargang,
            postnummer,
            by,
            loading: false,
        };
    } else {
        return 'No data found';
    }
}