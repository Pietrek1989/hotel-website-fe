import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center">
        <div className="px-6 py-12 md:px-12">
          <div className="container mx-auto xl:px-32">
            <div className="grid lg:grid-cols-2  items-center">
              <div className="md:mt-12 lg:mt-0 mb-12 lg:mb-0 z-10">
                <div
                  className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <h2 className="text-3xl font-bold mb-12">Contact us</h2>
                  <ContactForm />
                </div>
              </div>
              <div className="md:mb-12 lg:mb-0">
                <div
                  className="map-container relative shadow-lg rounded-lg"
                  style={{ height: 700 }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4615.645383232489!2d11.955422077292647!3d47.37601777311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4777d1ffb12caafb%3A0xc18b206f8bffc78c!2sAlm-Appartement-Inneralpbach!5e1!3m2!1sen!2sat!4v1683882832670!5m2!1sen!2sat"
                    className="left-0 top-0 h-full w-full absolute rounded-lg"
                    allowFullScreen
                    title="map to hotel"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
