import { PiMapPinFill, PiInstagramLogoBold } from "react-icons/pi";
import { FaPhone } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";

import forest from "../assets/forest.jpg";
import HeroBackground from "../components/HeroBackground";
import ContactLink from "../components/ContactLink";
export default function ContactHero() {
  return (
    <section id='contact' className="lg:snap-start relative overflow-hidden min-h-[calc(100vh-60px)]">
      
      <HeroBackground imageSrc={forest} heightClass="min-h-[calc(100vh-60px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto place-items-end-safe px-6 py-24 gap-6">

          <div className="flex flex-col justify-center ">
            <div>
              <h2 className="text-white text-6xl font-semi-bold">Umów się</h2>
              <h2 className="text-white text-6xl font-semi-bold">na pierwszą wizytę</h2>
            </div>
            
            <div className="flex flex-col flex-wrap gap-4 mt-6">
              <p className="text-white/90 mt-6">W razie jakichkolwiek pytań zapraszam do kontaktu</p>

              <ContactLink
                icon={<PiMapPinFill size={20} />}
                href="https://share.google/j8DJ7RsrmmoRQZ25i"
                label="ul. Siemińskiego 27/1 , 44-100 Gliwice"
              />
              <ContactLink
                icon={<FaPhone size={20} />}
                href="tel:+48690328246"
                label="+48 690 328 246 (SMS)"
              />
              <ContactLink
                icon={<LuMail size={20} />}
                href="mailto:kontakt.wrelacji@gmail.com"
                label="kontakt.wrelacji@gmail.com"
              />
              <ContactLink
                icon={<PiInstagramLogoBold size={20} />}
                href="https://instagram.com/jolanta_psychology"
                label="@jolanta_psychology"
              />
            </div>

            <div className="mt-6 ml-12">
              <p className="text-white/90">Koszt jednej sesji: 180 zł</p>
              <p className="text-white/90">Czas trwania: 50 minut </p>
            </div>
            
          </div>

          <div className="flex flex-col-reverse items-start mb-24 gap-6 max-w-sm">
            <a href="https://twojpsycholog.pl/profil-psychologa/jolanta-dominiak-konderak-5957" className="mx-6 text-whitish text-md font-semibold hover:text-gray-300 rounded-md bg-black/60 hover:bg-black/80 w-auto p-2 capitalize">UMÓW SIĘ NA WIZYTĘ</a>
            <h3 className="text-whitish text-2xl font-bold font-montserrat text-shadow-md">Wizyty umawiane są poprzez portal TwójPsycholog lub w wiadomości e-mail</h3>
            
          </div>
        
        </div>
      </HeroBackground>

    </section>
  );
}
