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
let tagFladeAreal;
let højdeTilTagrende;
let prisNedtagning;
let prisNytTag;
let nyTagType = 1;
let nyTagTypeTekst;
let priser;
let middelSamletPris;
let lavSamletPris;
let højSamletPris;
let tagMalingPris;
let skorsten = false;
let tagrender = false;
let udhæng = false;

export async function calculator(search) {
    const getGrundData = async (search) => {
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
                element.byg021BygningensAnvendelse == "110" ||
                element.byg021BygningensAnvendelse == "120" ||
                element.byg021BygningensAnvendelse == "130" ||
                element.byg021BygningensAnvendelse == "140" ||
                element.byg021BygningensAnvendelse == "150" ||
                element.byg021BygningensAnvendelse == "160" ||
                element.byg021BygningensAnvendelse == "190"
            ) {
                if (
                    !størsteBygning ||
                    element.byg049SamletBygningsareal > størsteBygning.byg049SamletBygningsareal
                ) {
                    størsteBygning = element;
                }
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
        if (kælder) {
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

    async function beregnPrisNedtagning() {
        //Beregn pris
        let prisNedtagning = 0;
        let pris = 0;
        if (tagType == 1) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 2) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 3) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 4) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 5) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 6) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 7) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 10) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 11) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 12) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 20) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 80) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 90) {
            pris = tagFladeAreal * 200;
        }
        prisNedtagning = pris;
        return prisNedtagning;
    }

    async function beregnPrisNytTag(nyTagType) {
        let prisNytTag = 0;
        let pris = 0;
        if (nyTagType == 1) {
            pris = tagFladeAreal * 1500;
        } else if (nyTagType == 2) {
            pris = tagFladeAreal * 1000;
        } else if (nyTagType == 3) {
            pris = tagFladeAreal * 1200;
        } else if (nyTagType == 4) {
            pris = tagFladeAreal * 600;
        } else if (nyTagType == 5) {
            pris = tagFladeAreal * 850;
        } else if (nyTagType == 6) {
            pris = tagFladeAreal * 1800;
        } else if (nyTagType == 7) {
            pris = tagFladeAreal * 1300;
        } else if (nyTagType == 8) {
            pris = tagFladeAreal * 1500;
        }
        prisNytTag = pris;
        return prisNytTag;
    }

    async function beregnSamletPris() {
        const formatter = new Intl.NumberFormat("DK", {
            style: "currency",
            currency: "DKK",
            minimumFractionDigits: 0,
        });

        const addThousandsSeparator = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        let pris = 0;
        let middelSamletPris = 0;
        let tagMalingPris = 0;
        let lavpris = 0;
        let højpris = 0;
        let lavSamletPris = 0;
        let højSamletPris = 0;
        if (tagVinkel > 25) {
            tagMalingPris = tagFladeAreal * 190;
            tagMalingPris = Math.ceil(tagMalingPris);
            tagMalingPris = addThousandsSeparator(tagMalingPris);
        }
        tagMalingPris = tagFladeAreal * 150;
        tagMalingPris = Math.ceil(tagMalingPris);
        tagMalingPris = addThousandsSeparator(tagMalingPris);
        pris = prisNedtagning + prisNytTag;
        lavSamletPris = pris * 0.8;
        lavSamletPris = Math.ceil(lavSamletPris);
        lavSamletPris = addThousandsSeparator(lavSamletPris);
        højSamletPris = pris * 1.2;
        højSamletPris = Math.ceil(højSamletPris);
        højSamletPris = addThousandsSeparator(højSamletPris);
        middelSamletPris = Math.ceil(pris);
        middelSamletPris = addThousandsSeparator(pris);

        return [middelSamletPris, lavSamletPris, højSamletPris, tagMalingPris];
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
    if(bygninger){
    bolig = await findBoligPåGrund();
    boligGrundPlan = bolig.byg041BebyggetAreal;
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
    prisNedtagning = await beregnPrisNedtagning();
    prisNytTag = await beregnPrisNytTag(nyTagType);
    priser = await beregnSamletPris();
    middelSamletPris = priser[0];
    lavSamletPris = priser[1];
    højSamletPris = priser[2];
    tagMalingPris = priser[3];
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
        middelSamletPris,
        lavSamletPris,
        højSamletPris,
        tagMalingPris,
        postnummer,
        by,
        loading: false,
    };
    } else {
        return 'No data found';
    }
}

export async function updatePrice(
    nyTagType,
    tagVinkel,
    tagFladeArealCustom,
    skorstenBool,
    tagrenderBool,
    udhængBool
) {
    async function beregnTagareal(tagVinkel) {
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

    async function nyTagTypeTekst(nyTagType) {
        let tagTypeTekst;
        if (nyTagType == 1) {
            tagTypeTekst = "Tegl";
        } else if (nyTagType == 2) {
            tagTypeTekst = "Stål";
        } else if (nyTagType == 3) {
            tagTypeTekst = "Beton";
        } else if (nyTagType == 4) {
            tagTypeTekst = "Tagpap";
        } else if (nyTagType == 5) {
            tagTypeTekst = "Eternit";
        } else if (nyTagType == 6) {
            tagTypeTekst = "Stråtag";
        } else if (nyTagType == 7) {
            tagTypeTekst = "Levende";
        } else if (nyTagType == 8) {
            tagTypeTekst = "Naturskifer";
        }
        return tagTypeTekst;
    }

    async function beregnPrisNedtagning() {
        //Beregn pris
        let prisNedtagning = 0;
        let pris = 0;
        if (tagType == 1) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 2) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 3) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 4) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 5) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 6) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 7) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 10) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 11) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 12) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 20) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 80) {
            pris = tagFladeAreal * 200;
        } else if (tagType == 90) {
            pris = tagFladeAreal * 200;
        }
        prisNedtagning = pris;
        return prisNedtagning;
    }

    async function beregnPrisNytTag(nyTagType) {
        let prisNytTag = 0;
        let pris = 0;
        if (nyTagType == 1) {
            pris = tagFladeAreal * 1500;
        } else if (nyTagType == 2) {
            pris = tagFladeAreal * 1000;
        } else if (nyTagType == 3) {
            pris = tagFladeAreal * 1200;
        } else if (nyTagType == 4) {
            pris = tagFladeAreal * 600;
        } else if (nyTagType == 5) {
            pris = tagFladeAreal * 850;
        } else if (nyTagType == 6) {
            pris = tagFladeAreal * 1800;
        } else if (nyTagType == 7) {
            pris = tagFladeAreal * 1300;
        } else if (nyTagType == 8) {
            pris = tagFladeAreal * 1500;
        }
        prisNytTag = pris;
        return prisNytTag;
    }

    async function beregnSamletPris(prisNytTag) {
        const formatter = new Intl.NumberFormat("DK", {
            style: "currency",
            currency: "DKK",
            minimumFractionDigits: 0,
        });

        const addThousandsSeparator = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        let pris = 0;
        let middelSamletPris = 0;
        let tagMalingPris = 0;
        let lavSamletPris = 0;
        let højSamletPris = 0;

        if (tagVinkel > 25) {
            tagMalingPris = tagFladeAreal * 190;
            tagMalingPris = Math.ceil(tagMalingPris);
            tagMalingPris = addThousandsSeparator(tagMalingPris);
        }
        tagMalingPris = tagFladeAreal * 150;
        tagMalingPris = Math.ceil(tagMalingPris);
        tagMalingPris = addThousandsSeparator(tagMalingPris);
        pris = prisNedtagning + prisNytTag;
        if (skorsten == true) {
            pris = pris + 10000;
        }
        if (tagrenderBool == true) {
            pris = pris + 10000;
        }
        if (udhængBool == true) {
            pris = pris + 10000;
        }

        lavSamletPris = pris * 0.8;
        lavSamletPris = Math.ceil(lavSamletPris);

        højSamletPris = pris * 1.2;
        højSamletPris = Math.ceil(højSamletPris);

        middelSamletPris = Math.ceil(pris);

        lavSamletPris = addThousandsSeparator(lavSamletPris);
        højSamletPris = addThousandsSeparator(højSamletPris);
        middelSamletPris = addThousandsSeparator(pris);

        return [middelSamletPris, lavSamletPris, højSamletPris, tagMalingPris, tagFladeAreal];
    }

    if (
        tagFladeArealCustom != 0 &&
        tagFladeArealCustom != null &&
        tagFladeArealCustom != undefined
    ) {
        tagFladeAreal = tagFladeArealCustom;
    } else {
        tagFladeAreal = await beregnTagareal(tagVinkel);
    }

    if (skorstenBool == true) {
        skorsten = true;
    } else {
        skorsten = false;
    }

    if (tagrenderBool == true) {
        tagrender = true;
    } else {
        tagrender = false;
    }

    if (udhængBool == true) {
        udhæng = true;
    } else {
        udhæng = false;
    }

    prisNedtagning = await beregnPrisNedtagning();
    prisNytTag = await beregnPrisNytTag(nyTagType);
    priser = await beregnSamletPris(prisNytTag);
    nyTagTypeTekst = await nyTagTypeTekst(nyTagType);
    middelSamletPris = priser[0];
    lavSamletPris = priser[1];
    højSamletPris = priser[2];
    tagMalingPris = priser[3];

    return {
        middelSamletPris,
        lavSamletPris,
        højSamletPris,
        tagMalingPris,
        tagFladeAreal,
        nyTagTypeTekst,
    };
}
