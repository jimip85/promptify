import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="purple_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        <span className="font-bold text-black">Promptify</span> is a
        cutting-edge AI prompting tool designed for the modern world, offering
        an open-source platform to explore, craft, and exchange creative and
        impactful prompts.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
