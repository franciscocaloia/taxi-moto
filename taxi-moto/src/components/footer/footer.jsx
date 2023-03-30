import React from "react";
import { useNavigation } from "react-router-dom";
import phoneLogo from "../../assets/phoneLogo.svg";
import instagramLogo from "../../assets/instagramLogo.svg";
export const Footer = () => {
  const navigation = useNavigation();
  return (
    <>
      <footer className="footer items-center p-4 bg-black text-neutral-content relative">
        {navigation.state === "loading" && (
          <progress className="progress progress-primary w-full absolute left-0 -top-2 rounded-none"></progress>
        )}
        <div className="items-center grid-flow-col">
          <p>Taxi Moto Esperanza</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <span className="flex gap-3">
            <img src={phoneLogo} className="h-6 w-6" alt="phone logo" />
            <p>349-656-1575</p>
          </span>
          <a
            href="https://www.instagram.com/taximotoesperanza/"
            target="_blank"
          >
            <img src={instagramLogo} className="h-6 w-6" alt="phone logo" />
          </a>
        </div>
      </footer>
      <div className="bg-footer-background h-12 bg-contain"></div>
    </>
  );
};
