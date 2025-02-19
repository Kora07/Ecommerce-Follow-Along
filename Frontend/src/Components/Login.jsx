import './login.css';

export default function Example() {
  return (
    <>
      <div className="container">
        <div className="logo-section">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="logo"
          />
          <h2 className="header">Sign in to your account</h2>
        </div>

        <div className="form-section">
          <form action="#" method="POST" className="form">
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <div className="input-container">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="password-container">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="forgot-password">
                  <a href="#" className="link">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="input-container">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="input"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4 px-4">
              <button type="submit" className="submit-button">
                Sign in
              </button>
              <button type="submit" className="submit-button">
                Sign up
              </button>
            </div>
          </form>

          <p className="footer-text">
            <a href="#">Need help?</a>
          </p>
        </div>
      </div>
    </>
  );
}