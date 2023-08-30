import { google } from "googleapis";

async function handler(req, res) {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
    const jwt = new google.auth.JWT(
        'andreas-service@andreas-384418.iam.gserviceaccount.com',
        undefined,
        // we need to replace the escaped newline characters
        // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDrJb664RCR/Zaz\n7xENh/8vrd9YGj8wmnQRemWT808xIj2fRFJXQ6INUdG4cEDOfIrzq/kwfP72EbIk\nqty5sprsgSLjzodgAcA0Sy4BTS3vA3AB9Macuio1kQfe7zw1CjSszXnZR0E+cV/J\nx66p00CvMTX+z5EVhV5ODs0ySBU5qDBuk7CewsZuW44wgLQnFPonikNAhyEI/lj2\nRzmNKygwKNVjlQ0+fvp9AZdlSwZ2vWXhGz1y/19ouUNTx8fk93X1noxDbdE+nCKx\nRSfsFqujG9AyKx+81rkmS47DRoL1UKA0bi8D4AOtgtHAYgI80KOnPvoSeiwRmPRZ\nb/bg/cuRAgMBAAECggEALVEK3sz8+oWag3axHKB252NkxX/Zaa56a9vgs5CSVG+6\n3HS4QaUBF/wKpLbNZn3N8YPU9ClCoX1rjXF4NDldbfK9HJXytOfheLJ8XTfYgFVz\nQo0/sXiXJdebYrVMLxSWbi7zKpJ22mfTA/n9iTDzKFAdjcvGtBUNxZFIrkYCASgw\nCSL5QAGHNC0rF7JF6ybLbZGtKC4jyLJZIRWvkpXGLVCdg6elfDbOLS3dtAcw0TLe\nbPzQOvGdHCoNF5Cl1BakseaQ4YtlBWXyO+dqm3FlexxaE0JyvRq+hmvjwWaXOfYk\nXacsghC7cGMhem+IWLc6dkT9Cqd89zKBC9YBWpmAmQKBgQD5EnAnN/TP8SIy3s+N\nshvyXZmzl5m2kJ15byzO3zVjdxNynGZPEZ9pUPOYdqQ0STc4UB39y4d1N63drFDB\nZ1bLF/lpqxtf2C92bqjX40RTVL4lxBA6lkpq93FfcDWzm1S1I0In1DExfxQMPbWr\neUo4wGphR1IUgciV5OSFTog8lwKBgQDxsCeKzPIO29VIP5/t4IG204ZgWr463HcN\nGro/DgI9I/edJdtVD+HpD0WD+z2wE7+BxH0KooahEJcbhGeNTnjNZLvm4TRaHW+O\n/pggdyrH8EeWvH7nRIQ0igPGD4WMP88d3agxpTgYFmHC7L3gTjcugnfwpcT7vRDH\nkH6wwlu2FwKBgQCpEXD7zinptN7n9QKiRlJeFFcu5ys6F7QtJ+AclLsix0N2Ot/f\nsDCrRn3z8iTIMSLAoPGawzsxwBfPLxaqEcGCnsV4iuNMDe050SffU6+feRiRfiMe\nAcKGFWzpwbtSLZA0XLidXJX/6Sjsnj7hJLXTDBmp6sW2kdpclUDhlEs6BQKBgCCV\n437vSuN9+C+ZhHKKBnMj6cYr9eHxv4tgwyOlO+AKbWQeqoe5cHf/uxukUBjhULyq\nRUGd0BD/L6BiJaQDpH3syvjB/FD6DwR0hwY5iucSGlTUbTe5ISoEQaX+ib7zC3W3\nYOnwoLN+sQea667GXOJEbO9hKkHWp+CANtSWH89ZAoGBAKIrgDGQlwc3lWLD6mJu\nY9tL5lDrGOsEUAxKymupBvwxbiktIYANYUdy7MMnsVH1nzXFoLWdI0YX2IIYuDCk\n8JS+rvXRjbHti81IkzZyby3rVT0p84oa9YpdYT8N5YdwLSXe5LT+1LAWydhdyHp9\n2o+0U0dCfobKbcNYcItroa9s\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n"),
        scopes
    );
    const sheets = google.sheets({ version: "v4", auth: jwt });
    // Add lead to sheet with name of sheetId
    const { id, dato, adresse, boligTagTypeTekst, nyTagTypeTekst, tagfladeareal, lavSamletPris, samletPris, hojSamletPris, udhaeng, tagrender, tagVinkel, hojdeTilTagrende, skorsten } = req.body;
    const newLead = await sheets.spreadsheets.values.append({
        spreadsheetId: '1qxYf2U8gHJPjNbbIM_8Mxcj2Dw7B_1nVhAWstTN0i1U',
        range: `Sheet1!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    id, dato, adresse, boligTagTypeTekst, nyTagTypeTekst, tagfladeareal, lavSamletPris, samletPris, hojSamletPris, udhaeng, tagrender, tagVinkel, hojdeTilTagrende, skorsten
                ],
            ],
        },
    }
    );
    res.json(newLead);
}
export default handler;