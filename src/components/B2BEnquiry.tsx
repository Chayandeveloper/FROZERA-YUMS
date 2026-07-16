"use client";

import { Send } from "lucide-react";
import React, { useState } from "react";

export default function B2BEnquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Using Web3Forms for backend-less email sending
    const formData = new FormData(e.currentTarget);
    
    formData.append("access_key", "787509cc-a9d3-4142-aba0-997991994bf2");
    formData.append("subject", "New B2B Enquiry from Frozera Yums Website");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Form submission failed:", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-primary-900 relative">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-800 to-primary-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Partner with <span className="text-accent">Us</span>
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Are you a distributor or retailer interested in stocking Frozera Yums? Fill out the form to request bulk pricing.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <span className="text-accent font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Premium Margins</h4>
                  <p className="text-white/50 text-sm">Highly competitive B2B pricing structure.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <span className="text-accent font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Reliable Supply</h4>
                  <p className="text-white/50 text-sm">Consistent stock availability and fast dispatch.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center bg-white/5 rounded-2xl p-8 border border-accent/20 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
                <p className="text-white/60 text-sm">Our team will get back to you within 24 hours with bulk pricing details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider ml-1">Name</label>
                    <input name="name" required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider ml-1">Phone</label>
                    <input name="phone" required type="tel" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="+91 98765..." />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs text-white/50 uppercase tracking-wider ml-1">Email</label>
                  <input name="email" required type="email" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="john@store.com" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs text-white/50 uppercase tracking-wider ml-1">Location / City</label>
                  <input name="location" required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Guwahati" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/50 uppercase tracking-wider ml-1">Expected Monthly Volume</label>
                  <select name="expected_volume" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option value="starter">Starter (under 100 packs)</option>
                    <option value="growth">Growth (100 - 500 packs)</option>
                    <option value="scale">Scale (500+ packs)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent-dark text-primary-900 font-bold py-4 rounded-lg mt-4 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Sending Request..." : "Request Bulk Quote"}</span>
                  <Send className={`w-4 h-4 ${isSubmitting ? "animate-pulse" : ""}`} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
