import React from "react";

function Footer() {
  return (
    <footer className="py-8 bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Al Makān. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
