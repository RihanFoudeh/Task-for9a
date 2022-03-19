import { signIn, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }) {
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={async (e) =>
          await signIn("credentials", {
            redirect: false,
            email: e.target.email.value,
            password: e.target.password.value,
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        <div className="bg-red-400 flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="mb-4">
              <label
                htmlFor="email"
                className="uppercase text-sm text-gray-600 font-bold"
              >
                Email
                <input
                  name="email"
                  aria-label="enter your email"
                  aria-required="true"
                  type="text"
                  className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="uppercase text-sm text-gray-600 font-bold"
              >
                password
                <input
                  name="password"
                  aria-label="enter your password"
                  aria-required="true"
                  type="password"
                  className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
