import Lead from "../../models/Lead";

const convertToPlainObject = (data) => {
    return JSON.parse(JSON.stringify(data));
};

async function handler(req, res) {
    const leadPriceId = req.body.leadPriceId;
        try {
            const lead = await Lead.findOne({ leadPriceId });
            const plainLead = convertToPlainObject(lead);
            res.json(plainLead);
        } catch (error) {
            res.json("Failed to fetch lead: " + error.message);
        }
}
export default handler;