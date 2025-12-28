// src/pages/ContactAndFooter.tsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactAndFooter: React.FC = () => {
  return (
    <div id="contact" className="bg-transparent text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black mb-6 uppercase italic tracking-tighter text-white">Get in <span className="text-[#FF8C00]">Touch</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Have a question or need a custom booking? Our team is available 24/7 to ensure your journey is perfect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111111]/90 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full bg-[#161616] border border-white/5 rounded-xl p-4 text-sm text-white outline-none" />
                <input type="email" placeholder="Email Address" className="w-full bg-[#161616] border border-white/5 rounded-xl p-4 text-sm text-white outline-none" />
              </div>
              <textarea rows={4} placeholder="How can we help?" className="w-full bg-[#161616] border border-white/5 rounded-xl p-4 text-sm text-white outline-none resize-none"></textarea>
              <button className="w-full bg-[#FF8C00] text-black font-black py-4 rounded-xl hover:bg-white transition-all uppercase tracking-widest text-xs">Send Message</button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: <Phone size={20} />, title: "Phone", value: "+1 (800) UNIQUE-01", sub: "Mon-Sun 24/7 Support" },
              { icon: <Mail size={20} />, title: "Email", value: "hello@uniquerentals.com", sub: "We reply within 2 hours" },
              { icon: <MapPin size={20} />, title: "Headquarters", value: "725 Luxury Drive, Suite 100", sub: "Beverly Hills, CA 90210" }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#111111]/90 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 flex items-center gap-6">
                <div className="bg-[#FF8C00] p-4 rounded-full text-black">{item.icon}</div>
                <div>
                  <h4 className="text-xs text-gray-500 font-bold uppercase mb-1">{item.title}</h4>
                  <p className="text-[#FF8C00] font-black text-lg tracking-tight">{item.value}</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-white/5 px-6 pt-20 pb-10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-[#FF8C00] w-3 h-3 rounded-sm"></div>
              <span className="font-black text-xl tracking-tighter uppercase text-white">Unique<span className="text-[#FF8C00]">Drive</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">Experience the luxury of premium travel. From sedans to rugged off-roaders, we provide the perfect ride for every journey.</p>
          </div>
          <div><h4 className="font-bold text-xs uppercase mb-8 text-[#FF8C00]">Company</h4><ul className="text-gray-500 text-sm space-y-4"><li>About Us</li><li>Our Cars</li><li>Pricing</li></ul></div>
          <div><h4 className="font-bold text-xs uppercase mb-8 text-[#FF8C00]">Contact</h4><ul className="text-gray-500 text-sm space-y-4"><li>support@uniquedrive.com</li><li>+1 (555) 000-0000</li></ul></div>
          <div><h4 className="font-bold text-xs uppercase mb-8 text-[#FF8C00]">Stay Updated</h4><div className="flex gap-2"><input type="email" placeholder="Your email" className="bg-[#161616] p-3 text-xs flex-1 outline-none" /><button className="bg-[#FF8C00] text-black font-bold px-4 py-2 rounded text-[10px] uppercase">Subscribe</button></div></div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center"><p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em]">© 2025 VoltDrive. All Rights Reserved.</p></div>
      </footer>
    </div>
  );
};

export default ContactAndFooter;