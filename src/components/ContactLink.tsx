import React from "react";

type ContactLinkProps = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

export default function ContactLink({ icon, href, label }: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 text-white hover:text-gray-500 transition-colors"
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/60 
                   hover:bg-black/80  transition-transform duration-200 transform group-hover:scale-110"
      >
        {icon}
      </div>
      <span className="underline underline-offset-2 decoration-transparent group-hover:text-gray-500 transition-all">
        {label}
      </span>
    </a>
  );
}
