import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="app-container">
      <div className="card">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
