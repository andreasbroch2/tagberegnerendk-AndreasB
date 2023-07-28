let bolig = {};
let grundplansareal = 0;
let stuehus = false;
let kælder = false;
let etager = 0;
let tagetageAreal = 0;
let tagvinkel = 0;
let fladttag = false;
let nuvTagType = 0;
let nuvTagTypeTekst = "";
let nyTagType = 5;
let nyTagTypeTekst = "";
let tagFlade = 0;
let højdeTagfod = 0;
let prisNedtagning = 0;
let prisNytTag = 0;
let samletPris = 0;
let lavSamletPris = 0;
let højSamletPris = 0;
let tagMalingPris = 0;
let adresseID = 0;
let bygninger = [];
let by;
let postnummer;

export const handleAutocompleteClick = async (
    selectedAdresse,
    setSearchText,
    setAutocompleteResults,
    props
) => {
    //Hvis der ikke er et tal i adressen, så giv en fejlmeddelelse
    if (selectedAdresse.match(/\d+/g) == null) {
        alert("Der skal være et husnummer i adressen");
        return;
    }
    if (selectedAdresse.length > 15) {
        setSearchText("");
        props.setAdresse(selectedAdresse);
        setAutocompleteResults([]);
        await getGrundData(selectedAdresse);
        await getBoligData(adresseID);
        await findBoligPåGrund();
        props.setGrundplansareal(grundplansareal);
        props.setTagVinkel(tagvinkel);
        props.setHøjdeTilTagfod(højdeTagfod);
        props.setNuværendeTagType(nuvTagType);
        props.setSearchPage(1);
    }
};

export async function resetAllValues() {
    bolig = {};
    grundplansareal = 0;
    stuehus = false;
    kælder = false;
    etager = 0;
    tagetageAreal = 0;
    tagvinkel = 0;
    fladttag = false;
    nuvTagType = 0;
    nuvTagTypeTekst = "";
    nyTagType = 5;
    nyTagTypeTekst = "";
    tagFlade = 0;
    højdeTagfod = 0;
    prisNedtagning = 0;
    prisNytTag = 0;
    samletPris = 0;
    lavSamletPris = 0;
    højSamletPris = 0;
    tagMalingPris = 0;
}

export const getGrundData = async (search) => {
    //Make space to - in search
    search = search.replace(" ", "-");
    const url = "https://api.dataforsyningen.dk/adresser?q=" + search;
    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            adresseID = data[0].adgangsadresse.id;
            //if there is no adresseID, then console.log error
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

export const getBoligData = async () => {
    const url =
        "https://services.datafordeler.dk/BBR/BBRPublic/1/rest/bygning?username=LMQRTEJYRQ&password=TmmycgtX-1303&Format=JSON&Husnummer=" +
        adresseID;
    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            //If there is no data, then console.log error
            if (data.length == 0) {
                console.log("No data found");
                return;
            }
            bygninger = data;
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

export const findBoligPåGrund = async () => {
    let størsteBygning = null;

    bygninger.forEach((element) => {
        console.log(element.byg021BygningensAnvendelse);
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

    if (størsteBygning) {
        bolig = størsteBygning;
        console.log("Bolig: ");
        console.log(bolig);
        findGrundplansareal();
    }
};

async function findGrundplansareal() {
    //Find grundplansareal
    grundplansareal = bolig.byg041BebyggetAreal;
    console.log("Grundplansareal: " + grundplansareal);
    /*  console.log("Grundplansareal: " + grundplansareal); */
    findTagmateriale();
}

async function findTagmateriale() {
    if (bolig.byg033Tagdækningsmateriale == "1") {
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
    /*  console.log("Nuværende tagtype: " + nuvTagTypeTekst); */
    tjekKælder();
}

async function tjekKælder() {
    //Find ud af om der er kælder i huset
    if (bolig.etageList && Array.isArray(bolig.etageList)) {
        bolig.etageList.forEach((element) => {
            //Find etagen der har typen "kl", hvis den findes.
            if (element.etage.eta006BygningensEtagebetegnelse == "kl") {
                kælder = true;
            }
        });
    }
    /*  console.log("Kælder: " + kælder); */
    findHøjdeTagfod();
}

async function findHøjdeTagfod() {
    //Find bolighøjde
    //Hvis der er kælder i huset skal der lægges 1 til højden
    if (kælder) {
        højdeTagfod = bolig.byg054AntalEtager * 2.5 + 1;
    }
    //Hvis der ikke er kælder i huset skal der ikke lægges 1 til højden
    else {
        højdeTagfod = bolig.byg054AntalEtager * 2.5;
    }
    /* console.log("Højde til tagfod: " + højdeTagfod); */
    findBoligEtager();
}

const findBoligEtager = async () => {
    if (!bolig.etageList) {
        stuehus = true;
    } else if (Array.isArray(bolig.etageList) && bolig.etageList.length === 1) {
        stuehus = true;
    } else if (Array.isArray(bolig.etageList) && bolig.etageList.length > 1) {
        stuehus = false;
    }
    console.log("Stuehus: " + stuehus);
    if (kælder && Array.isArray(bolig.etageList)) {
        etager = bolig.etageList.length - 1;
    } else if (Array.isArray(bolig.etageList)) {
        etager = bolig.etageList.length;
    }
    /* console.log("Antal etager: " + etager); */
    findTagetageAreal();
};

async function findTagetageAreal() {
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
    /* console.log("Tagetage areal: " + tagetageAreal); */
    beregnTagvinkel();
}

async function beregnTagvinkel() {
    //Beregn tagvinkel
    /* console.log(stuehus, tagetageAreal, grundplansareal, fladttag); */
    if (stuehus) {
        tagvinkel = 25;
        console.log("Tagvinkel1: " + tagvinkel);
        if (fladttag) {
            tagvinkel = 0;
            console.log("Tagvinkel2: " + tagvinkel);
        }
    } else if (!stuehus && tagetageAreal > 0 && tagetageAreal < grundplansareal && !fladttag) {
        tagvinkel = 45;
        console.log("Tagvinkel3: " + tagvinkel);
    } else if (!stuehus && fladttag) {
        tagvinkel = 0;
        /* console.log("Tagvinkel4: " + tagvinkel); */
    } else {
        tagvinkel = 25;
        /* console.log("Tagvinkel5: " + tagvinkel); */
    }
    beregnTagareal();
}

async function beregnTagareal() {
    // Konverterer tagvinklen til radianer
    let vinkelRadianer = (tagvinkel * Math.PI) / 180;

    // Beregner cosinus af tagvinklen
    let cosTagvinkel = Math.cos(vinkelRadianer);

    // Beregner tagarealet
    let tagareal = grundplansareal / cosTagvinkel;

    // Returnerer tagarealet
    tagareal = Math.round(tagareal);
    tagFlade = tagareal;
    console.log("Tagflade: " + tagFlade);
}

async function beregnPrisNedtagning() {
    //Beregn pris
    let pris = 0;
    if (nuvTagType == 1) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 2) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 3) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 4) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 5) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 6) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 7) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 10) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 11) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 12) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 20) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 80) {
        pris = tagFlade * 200;
    } else if (nuvTagType == 90) {
        pris = tagFlade * 200;
    }
    prisNedtagning = pris;
    console.log("Pris nedtagning: " + prisNedtagning);
    beregnPrisNytTag();
}

async function beregnPrisNytTag() {
    //Beregn pris
    let pris = 0;
    if (nyTagType == 1) {
        pris = tagFlade * 1500;
    } else if (nyTagType == 2) {
        pris = tagFlade * 1000;
    } else if (nyTagType == 3) {
        pris = tagFlade * 1200;
    } else if (nyTagType == 4) {
        pris = tagFlade * 600;
    } else if (nyTagType == 5) {
        pris = tagFlade * 850;
    } else if (nyTagType == 6) {
        pris = tagFlade * 1800;
    } else if (nyTagType == 7) {
        pris = tagFlade * 1300;
    } else if (nyTagType == 8) {
        pris = tagFlade * 1500;
    }
    prisNytTag = pris;
    console.log("Nyt tag pris: " + prisNytTag);
    beregnSamletPris();
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
    let lavpris = 0;
    let højpris = 0;
    if (tagvinkel > 25) {
        tagMalingPris = tagFlade * 190;
    }
    tagMalingPris = tagFlade * 150;
    tagMalingPris = Math.ceil(tagMalingPris);
    tagMalingPris = addThousandsSeparator(tagMalingPris);
    pris = prisNedtagning + prisNytTag;
    lavpris = pris * 0.8;
    lavpris = Math.ceil(lavpris);
    lavpris = addThousandsSeparator(lavpris);
    lavSamletPris = `${lavpris} kr`;
    højpris = pris * 1.2;
    højpris = Math.ceil(højpris);
    højpris = addThousandsSeparator(højpris);
    højSamletPris = `${højpris} kr`;
    pris = Math.ceil(pris);
    pris = addThousandsSeparator(pris);
    samletPris = `${pris} kr`;
    console.log("Samlet pris: " + samletPris);
    console.log("Lav samlet pris: " + lavSamletPris);
    console.log("Høj samlet pris: " + højSamletPris);
}

function setNyTagTypeTekst() {
    if (nyTagType == 1) {
        nyTagTypeTekst = "Tegl";
    } else if (nyTagType == 2) {
        nyTagTypeTekst = "Stål";
    } else if (nyTagType == 3) {
        nyTagTypeTekst = "Beton";
    } else if (nyTagType == 4) {
        nyTagTypeTekst = "Tagpap";
    } else if (nyTagType == 5) {
        nyTagTypeTekst = "Eternit";
    } else if (nyTagType == 6) {
        nyTagTypeTekst = "Stråtag";
    } else if (nyTagType == 7) {
        nyTagTypeTekst = "Levende";
    } else if (nyTagType == 8) {
        nyTagTypeTekst = "Naturskifer";
    }
}

export const setNewValues = async (grundplansarealNy, nuvTagTypeNy, tagVinkelNy, getnyTagType) => {
    nuvTagType = nuvTagTypeNy;
    tagvinkel = tagVinkelNy;
    grundplansareal = grundplansarealNy;
    nyTagType = getnyTagType;
    setNyTagTypeTekst();
    beregnTagareal();
    beregnPrisNedtagning();
    console.log("Grundplansareal: " + grundplansareal);
    console.log("Nuværende tagtype: " + nuvTagType);
    console.log("Nyt tagtype: " + nyTagType);
    console.log("Tagflade: " + tagFlade);
    console.log("Højde til tagfod: " + højdeTagfod);
    console.log("Samlet pris: " + samletPris);
    console.log("Lav samlet pris: " + lavSamletPris);
    console.log("Høj samlet pris: " + højSamletPris);
};

export const getGrundPlansAreal = async () => {
    return grundplansareal;
};

export const getTagVinkel = async () => {
    return tagvinkel;
};

export const getSamletPris = async () => {
    return samletPris;
};

export const getLavSamletPris = async () => {
    return lavSamletPris;
};

export const getTagMalingPris = async () => {
    return tagMalingPris;
};

export const getHøjSamletPris = async () => {
    return højSamletPris;
};

export const getNuvTagType = async () => {
    return nuvTagType;
};

export const getTagFlade = async () => {
    return tagFlade;
};

export const getHøjdeTagfod = async () => {
    return højdeTagfod;
};

export const getNyTagTypeTekst = async () => {
    return nyTagTypeTekst;
};

export const getNuvTagTypeTekst = async () => {
    return nuvTagTypeTekst;
};
