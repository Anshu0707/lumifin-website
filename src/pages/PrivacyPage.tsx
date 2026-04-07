import React from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-40 pb-32 px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Legal</span>
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Effective Date: January 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <p>
              Lumifin (“we”, “our”, “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you visit our website <a href="https://www.lumifin.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.lumifin.io</a> or use our services.
            </p>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">1. Information We Collect</h2>
              <p>
                We may collect personal information such as your name, email address, phone number, and any information you provide when registering or contacting us. We also automatically collect technical information including IP address, browser type, device information, operating system, and usage data when you interact with our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and improve our services</li>
                <li>Communicate with you regarding updates and support</li>
                <li>Process transactions and verify identities</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">3. Data Sharing</h2>
              <p>
                We do not sell or rent your personal information. We may share your data with trusted third-party service providers such as payment partners, analytics providers, and infrastructure vendors solely for the purpose of operating our services, under strict confidentiality agreements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">4. Data Security</h2>
              <p>
                We use appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, or misuse.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">5. User Rights</h2>
              <p>
                You have the right to request access, correction, or deletion of your personal information. You may also withdraw consent where applicable by contacting us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">6. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">7. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your country of residence, which may have different data protection laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">8. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a revised effective date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">9. Contact Us</h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy, please contact us at:
              </p>
              <p>Email: info@lumifin.io</p>
            </section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
