'use client';

import React, { useState } from 'react';
import { useSettingsStore } from '@/context/settingsStore';
import { useToastStore } from '@/context/toastStore';
import { generateWhatsAppLink } from '@/lib/utils';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { settings } = useSettingsStore();
  const { showToast } = useToastStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Thank you for reaching out! Our team will reply shortly.');
  };

  const whatsappNumber = settings.whatsappNumber || '+94 74 022 5855';
  const whatsappUrl = generateWhatsAppLink(
    whatsappNumber,
    'Hello BUTTERFLY! I would like some assistance with baby and mom care products.'
  );

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            We&apos;re Here For You
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-butterfly-text">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-butterfly-textMuted leading-relaxed">
            Have questions about product sizing, materials, or islandwide delivery? Our friendly maternal care advisors are always happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-6">
              <h2 className="font-serif text-xl font-bold text-butterfly-text">
                Customer Care & Store Details
              </h2>

              <div className="space-y-4 text-xs text-butterfly-text">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center text-butterfly-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-butterfly-text">Flagship Boutique & HQ</h4>
                    <p className="text-butterfly-textMuted leading-relaxed mt-0.5">
                      {settings.address || 'No. 42, Lotus Avenue, Colombo 07, Sri Lanka'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center text-butterfly-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-butterfly-text">Direct Hotline</h4>
                    <p className="text-butterfly-textMuted leading-relaxed mt-0.5">
                      {settings.contactPhone || '+94 11 234 5678'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center text-butterfly-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-butterfly-text">Email Inquiries</h4>
                    <p className="text-butterfly-textMuted leading-relaxed mt-0.5">
                      {settings.contactEmail || 'care@butterflycare.lk'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center text-butterfly-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-butterfly-text">Support Hours</h4>
                    <p className="text-butterfly-textMuted leading-relaxed mt-0.5">
                      Monday – Saturday: 9:00 AM – 7:00 PM<br />
                      Sunday & Poya Days: 10:00 AM – 4:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-card flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-butterfly-border shadow-card">
              <h2 className="font-serif text-xl font-bold text-butterfly-text mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-butterfly-text">Message Dispatched</h3>
                  <p className="text-xs text-butterfly-textMuted max-w-sm mx-auto leading-relaxed">
                    Thank you, {name}. Our maternal care team has received your message and will respond within 2-4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-butterfly-soft text-butterfly-text text-xs font-semibold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-butterfly-text mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dilani Perera"
                        className="w-full p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-butterfly-text mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dilani@example.com"
                        className="w-full p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="w-full p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Your Message *</label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you and your little one today?"
                      className="w-full p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-widest transition-all shadow-card flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
