import { type ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "./Spinner";


interface SignupInput {
  name?: string;
  username: string;
  password: string;
}

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    password: "",
    ...(type === "signup" ? { name: "" } : {})
  });

  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    try {
      const url = `${BACKEND_URL}/api/v1/user/${type}`;
      const response = await axios.post(url, postInputs);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      alert(`${type === "signup" ? "Signed up" : "Signed in"} successfully!`);
      navigate("/blogs");
    } catch (err: any) {
      console.error("Auth error:", err?.response?.data || err.message);
      alert("Failed to authenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const { username, password } = postInputs;
    if (!username.trim() || !password.trim()) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    sendRequest();
  };

  return (
    <div className="w-80">
      <h2 className="text-4xl font-bold text-black text-center mb-4">
        {type === "signup" ? "Create an account" : "Sign In"}
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
        <Link
          className="pl-1 underline text-gray-600"
          to={type === "signup" ? "/signin" : "/signup"}
        >
          {type === "signup" ? "Sign In" : "Sign Up"}
        </Link>
      </p>

      <div className="space-y-4">
        {type === "signup" && (
          <LabelledInput
            label="Name"
            placeholder="Enter your name"
            onChange={(e) =>
              setPostInputs({ ...postInputs, name: e.target.value.trimStart() })
            }
          />
        )}

        <LabelledInput
          label="Username"
          placeholder="Enter your email"
          onChange={(e) =>
            setPostInputs({ ...postInputs, username: e.target.value.trimStart() })
          }
        />

        <LabelledInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) =>
            setPostInputs({ ...postInputs, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Spinner /> : (type === "signup" ? "Sign Up" : "Sign In")}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type = "text"
}: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className="w-full border border-gray-300 text-sm rounded-md px-3 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
