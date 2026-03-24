import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { title: "Digital Queue Management System", joinQueue: "Join Queue", analytics: "Analytics" } },
  hi: { translation: { title: "डिजिटल कतार प्रबंधन प्रणाली", joinQueue: "कतार में शामिल हों", analytics: "विश्लेषण" } },
  te: { translation: { title: "డిజిటల్ క్యూ మేనేజ్‌మెంట్ సిస్టమ్", joinQueue: "క్యూలో చేరండి", analytics: "విశ్లేషణలు" } }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
