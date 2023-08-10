const Footer = () => {
  return (
    <footer className="footer p-10 text-slate-400 bg-black font-space">
      <div>
        <p>
          BIGBANG TEAM
          <br />
          Providing reliable tech since 2123
        </p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Shop</a>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <span className="footer-title">FAQ</span>
        <a className="link link-hover">Who are we?</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Help</a>
        <a className="link link-hover">Project</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
