import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
export const Signup = () => {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Auth */}
      <div className="flex justify-center items-center bg-white">
        <Auth type="signup" />
      </div>

      {/* Right Side - Quote */}
      <div className="hidden md:flex justify-center items-center bg-slate-200">
        <Quote />
      </div>
    </div>
  );
};
