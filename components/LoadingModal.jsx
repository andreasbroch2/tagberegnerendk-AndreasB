// Loading Modal Component

export default function LoadingModal(props) {
    console.log("props: ", props);
    return (
        <div id="loadingModal" className={`${props.hidden && 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center`}>
            <div className="bg-white rounded-lg p-10">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
                <div className="text-center mt-10">
                    <p className="text-2xl font-semibold">{props.text}</p>
                </div>
            </div>
        </div>
    );
}