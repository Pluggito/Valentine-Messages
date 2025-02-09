import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useValentineContext } from "./Context/ValentineContext";
import { useNavigate } from "react-router-dom";

const DisplayMessage = () => {
    const { name, messages, fetchMessage } = useValentineContext();
    const [loading, setLoading] = useState(true); // State for loading
    const [response, setResponse] = useState(null); // State for Yes/No answer
    const navigate = useNavigate();

    useEffect(() => {
        const getMessage = async () => {
            setLoading(true); // Start loading
            await fetchMessage(); // Fetch AI-generated message
            setLoading(false); // Stop loading
        };

        if (name) {
            getMessage();
        }
    }, [name]); // Fetch message when `name` changes

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full text-center bg-white p-6 rounded-lg shadow-lg h-full"
            >
                <h1 className="text-xl md:text-2xl font-semibold text-red-500">{name && `Dear ${name},`}</h1>

                {loading ? (
                    <p className="text-gray-500 animate-pulse">Generating your special message...</p>
                ) : messages.length > 0 ? (
                    <p className="text-gray-700 font-medium tracking-wide mt-4">{messages[0].content}</p>
                ) : (
                    <p className="text-gray-500">No message generated yet.</p>
                )}

                {/* "Will you be my Valentine?" Section */}
                {!loading && messages.length > 0 && !response && (
                    <div className="mt-6">
                        <p className="text-lg md:text-xl font-semibold text-red-500">Will you be my Valentine? ❤️</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                            <button
                                className="bg-pink-500 text-white px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-pink-600 cursor-pointer"
                                onClick={() => setResponse("yes")}
                            >
                                Yes! 💖
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-400 cursor-pointer"
                                onClick={() => setResponse("no")}
                            >
                                No 😢
                            </button>
                        </div>
                    </div>
                )}

                {/* Response Message */}
                {response === "yes" && <p className="text-green-500 mt-4">Yay! 💕 You made my day! 😍</p>}
                {response === "no" && <p className="text-gray-500 text-5xl mt-4">Oh... maybe next time? 🥺</p>}
            </motion.div>

            <button className="mt-5 text-blue-500 underline cursor-pointer" onClick={() => navigate("/")}>
                Back
            </button>
        </div>
    );
};

export default DisplayMessage;
