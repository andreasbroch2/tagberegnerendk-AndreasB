import Image from "next/image"
import trustpilotLogo from "../assets/trustpilotlogo.png"
import trustpilotStars from "../assets/star4.5.svg"

export default function BTTrustpilot() {
    return (
        <div className="flex flex-col place-content-center items-center">
            <div class="trustbox__logo">
                <Image src={trustpilotLogo} alt="trustpilot logo" width={130} height={54} />
            </div>
            <div class="trustbox__stars">
                <Image src={trustpilotStars} width={160} height={30} />
            </div>
            <div class="trustbox__score">TrustScore <b>4.6</b> - <b>3781</b> anmeldelser</div>
        </div>
    )
}