import Image from "next/image";

export default function FindHåndværker() {
    return (
        <section className="flex justify-center pt-20 pb-16 mb-16">
            <div className="container">
                <div className="flex justify-center gap-10 ">
                    <Image
                        className="hidden lg:block shadow-xl rounded-3xl"
                        src="/./billedehåndværker1.png"
                        width={150}
                        height={150}
                        alt="Billede af håndværker"
                    />
                    <Image
                        className="shadow-xl rounded-3xl"
                        src="/./billedehåndværker2.png"
                        width={150}
                        height={150}
                        alt="Billede af håndværker"
                    />
                    <Image
                        className="shadow-xl rounded-3xl"
                        src="/./billedehåndværker3.png"
                        width={150}
                        height={150}
                        alt="Billede af håndværker"
                    />
                </div>
                <div className="mt-16">
                    <h2 className="text-center font-semibold leading-tight text-4xl lg:text-5xl">
                        Find en godkendt håndværker nær dig
                    </h2>
                    <p className="text-center mt-8">
                        indtast by og find en godkendt håndværker eller tagmaler nær dig
                    </p>
                </div>
                <div className="text-center">
                    <input
                        className=" p-4 px-8 mt-8 rounded-lg text-black border border-gray-100 w-full lg:w-4/12 shadow-lg"
                        type="text"
                        placeholder="Indtast by"
                        autoComplete="address-level2"
                    />
                </div>
            </div>
        </section>
    );
}
