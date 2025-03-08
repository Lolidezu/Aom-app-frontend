interface ButtonProps {
    href: string;
    label: string;
  }
  
  export default function WelcomeButton({ href, label }: ButtonProps) {
    return (
      <a
        href={href}
        className="px-6 py-3 bg-slate-950/30 border-2 border-blue-300/60 text-white text-lg hover:bg-slate-700/30 transition duration-200"
      >
        {label}
      </a>
    );
  }
  