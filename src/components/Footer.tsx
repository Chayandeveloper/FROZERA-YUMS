import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#110c08] pt-16 pb-8 px-4 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-2">
             <div className="flex items-center gap-3 mb-6">
                {/* Small Logo Placeholder */}
                <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-white/10 flex items-center justify-center">
                   <span className="text-white text-xs font-bold uppercase">FY</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-widest uppercase">Frozera<span className="text-accent">Yums</span></h3>
             </div>
             <p className="text-white/60 max-w-sm mb-6">
                Premium vegetarian frozen delights manufactured with love and the highest hygiene standards.
             </p>
             <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/50 font-medium">100% VEG</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/50 font-medium">NO ONION NO GARLIC</span>
             </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">Whitebrain Industries Pvt. Ltd.<br />Bhurabari, Santipur,<br />Guwahati-781009, Assam</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">contact@whitebrains.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal & Compliance</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex flex-col">
                <span className="text-white/40 text-xs uppercase tracking-wider mb-1">FSSAI License</span>
                <span className="font-mono text-white/80">103XXXXXXXXXXX</span> {/* Placeholder for actual number if provided */}
              </li>
              <li className="flex flex-col">
                <span className="text-white/40 text-xs uppercase tracking-wider mb-1">GSTIN</span>
                <span className="font-mono text-white/80">18XXXXXXXXXXXXX</span> {/* Placeholder for actual number if provided */}
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Whitebrain Industries Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-white/40">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
