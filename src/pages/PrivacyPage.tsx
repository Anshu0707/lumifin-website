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
              Last updated: April 3, 2026
            </p>
          </div>
          
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">1. Introduction</h2>
              <p>
                LumiFin ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, such as when you create an account, verify your identity, or contact support. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification information (Name, email address, phone number).</li>
                <li>Government-issued identification documents for KYC compliance.</li>
                <li>Financial information related to your transactions and linked bank accounts.</li>
                <li>Device information and usage data.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services.</li>
                <li>Process transactions and send related information.</li>
                <li>Verify your identity and prevent fraud.</li>
                <li>Comply with legal and regulatory requirements.</li>
                <li>Communicate with you about products, services, and events.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">4. Data Security</h2>
              <p>
                We use industry-standard security measures, including encryption and secure authentication methods, to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">5. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@lumifin.io.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
