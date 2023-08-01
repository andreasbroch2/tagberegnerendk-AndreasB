import MineLeads from "../../_components/mineleads";
import UI from "../../_components/ui";
import { getUserData } from "../../utils/Serveractions/getUserData";

export const metadata = {
    title: "Mine Leads - Se alle dine købte leads her - Tagberegneren.dk",
    description:
        "Se alle dine købte leads her. Du kan se alle leads, du har købt.",
};

const MyLeads = () => {
    return <MineLeads getUserData={getUserData} />;
};

export default MyLeads;
