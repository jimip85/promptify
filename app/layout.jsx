import "@styles/globals.css";

import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptify",
  description: "Discover & Disseminate Effective AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
