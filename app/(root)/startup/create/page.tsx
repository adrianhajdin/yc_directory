import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="min-h-screen ">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <section className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100/50 to-purple-100/50 blur-3xl -z-10" />
          
          <div className="relative backdrop-blur-sm bg-white/60 p-8 rounded-2xl border border-gray-200/50 shadow-xl">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Rocket className="w-8 h-8 text-purple-600 animate-pulse" />
              <Sparkles className="w-6 h-6 text-indigo-500" />
            </div>
            
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-center mb-4">
              Submit Your Startup
            </h1>
            
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
              ✅Join our exclusive network of innovative startups shaping the future
            </p>
          </div>
        </section>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/40 to-indigo-100/40 blur-2xl -z-10" />
          
          <div className="relative backdrop-blur-sm bg-white/80 p-8 lg:p-12 rounded-3xl border border-gray-200/50 shadow-2xl hover:shadow-xl transition-all duration-500">
            {/* Animated Corner Decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-purple-500 rounded-tl-3xl -translate-x-2 -translate-y-2" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-indigo-500 rounded-br-3xl translate-x-2 translate-y-2" />
            
            <div className="relative z-10">
              <StartupForm />
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 flex justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Page;
