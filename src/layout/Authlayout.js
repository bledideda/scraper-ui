import "./AuthLayout.css";

export default function AuthLayout({ children }) {
  return (
    <div className="authPage">
      <div className="authPageContent">{children}</div>
    </div>
  );
}
