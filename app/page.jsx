import Feed from "@components/Feed"
const Home = () => {
  return (
   <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">AI-Powered Prompts</span>/
    </h1>
    <p className="desc text-center">
        PromptHub is an open-source platform that allows you to discover and share AI-generated prompts. Explore our collection of prompts or create your own.
    </p>
    <Feed/>
   
   </section>
  )
}

export default Home
