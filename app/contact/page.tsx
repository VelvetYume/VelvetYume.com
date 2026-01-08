// app/contact/page.tsx
'use client';

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#0d001f] to-[#1a0033]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
          Contact Us
        </h1>

        {/* DMCA Takedown Linki */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-pink-500/30 text-center">
          <h2 className="text-3xl font-bold text-pink-400 mb-6">
            Copyright Takedown Request (DMCA)
          </h2>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            If you believe any content on this site infringes your copyright,  
            please send your takedown request to the email below.  
            We review and act promptly on valid notices.
          </p>

          <a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=dmcavelvetyume@gmail.com&su=DMCA%20Takedown%20Request&body=Please%20provide%20the%20following%20details:%0A%0A1.%20Your%20full%20name:%0A2.%20Your%20email:%0A3.%20URL%20of%20the%20original%20copyrighted%20work:%0A4.%20URL%20of%20the%20infringing%20content%20on%20our%20site:%0A5.%20Statement%20of%20good%20faith:%20I%20swear%2C%20under%20penalty%20of%20perjury%2C%20that%20the%20information%20is%20accurate%20and%20that%20I%20am%20the%20owner%20or%20authorized%20to%20act%20on%20behalf%20of%20the%20owner."
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
>
  📩 Send DMCA Takedown Request (via Gmail)
</a>
        </div>

        {/* Genel İletişim */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/30 text-center">
  <p className="text-gray-300 text-lg mb-6">
    For general inquiries, support, or copyright takedown requests, reach out to:
  </p>
  <a 
    href="mailto:dmcavelvetyume@gmail.com"
    className="text-pink-400 hover:text-pink-300 font-bold text-xl underline"
  >
    dmcavelvetyume@gmail.com
  </a>
</div>
      </div>
    </div>
  );
}