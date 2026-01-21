import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ValentineContext = createContext();
export const useValentineContext = () => useContext(ValentineContext);

export const ValentineContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [name, setName] = useState("");

  const fetchMessage = async () => {
    if (!name) {
      console.error("Error: Name is required before generating a message.");
      return;
    }

    try {
      const response = await fetch(
        `https://unlimited-gpt-4.p.rapidapi.com/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "unlimited-gpt-4.p.rapidapi.com",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Write a heartfelt Valentine's Day letter for someone named ${name}. 
                                           The letter should be exactly 250 words. 
                                           It should express deep love, appreciation, and romantic emotions.
                                           The letter must be written in ${preferredLanguage}. 
                                           DO NOT use English if another language is requested.
                                           Do not put (Your Name) at the end of the mesasge`,
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await response.json();

      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiResponse) {
        setMessages([{ role: "bot", content: aiResponse }]); // Replace previous message
      } else {
        console.error("Invalid API response:", data);
      }
    } catch (error) {
      console.error("Error fetching message:", error);
      console.log(error);
    }

    ValentineContextProvider.propTypes = {
      children: PropTypes.node.isRequired,
    };
  };

  return (
    <ValentineContext.Provider
      value={{ messages, fetchMessage, setPreferredLanguage, name, setName }}
    >
      {children}
    </ValentineContext.Provider>
  );
};
