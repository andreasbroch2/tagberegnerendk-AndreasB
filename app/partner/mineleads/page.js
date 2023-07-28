import MineLeads from "../../_components/mineleads";
import UI from "../../_components/ui";
import { getUserData } from "../../utils/Serveractions/getUserData";

const MyLeads = () => {
    return <MineLeads getUserData={getUserData} />;
};

export default MyLeads;
