export default function Navbar() {
  return (
    <>
      <main className="container text-center my-4">
        <div id="home" aria-hidden="true"></div>

        <section id="about" className="my-4">
          <h2 className="h4 fw-bold mb-2">About</h2>
          <p className="text-secondary mb-0">
            This is the about section of the website.
          </p>
        </section>

        <section id="contact" className="my-4">
          <h2 className="h4 fw-bold mb-2">Contact</h2>
          <p className="text-secondary mb-0">
            For any inquiries, please contact us at example@example.com.
          </p>
        </section>
      </main>

      <footer className="bg-brand-orange-weak text-light small py-3 border mt-4">
        <div className="container text-center">
          © 2023 Website. All rights reserved.
        </div>
      </footer>
    </>
  );
}