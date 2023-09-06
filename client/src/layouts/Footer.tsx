const Footer = () => {
  return (
    <footer className="footer p-10 text-slate-700 font-poppins">
      <div className="flex items-center gap-4">
        <img
          className="h-12 animate-spin"
          src="https://imageupload.io/ib/uyxtA4y1d1wcLgK_1693993204.png"
        />
        <p className="flex flex-col">
          <span className="text-gray-700 font-bold font-space">
            BIGBANG TEAM
          </span>
          <span>Providing reliable tech since 2123</span>
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
