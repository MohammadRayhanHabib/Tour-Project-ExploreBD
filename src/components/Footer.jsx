import { Github, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-teal-950 text-white mt-12">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Branding */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-teal-400">ExploreBD</h2>
                    <p className="text-sm text-teal-200">Explore. Experience. Enjoy your journey!</p>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 items-center">
                    <a
                        href="https://github.com/your-github"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-teal-400 transition"
                        aria-label="GitHub"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href="https://linkedin.com/in/your-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-teal-400 transition"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-teal-800 py-4 text-center text-sm text-teal-300">
                © {new Date().getFullYear()} WanderMate. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
