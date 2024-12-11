export default function Login() {
  return (
    <>
      <div className="p-4 flex flex-col items-center gap-3">
        <h2 className="text-4xl">Login</h2>
        <div className="bg-slate-500 w-2/3 rounded-xl p-4 flex flex-col items-center">
          <form className="flex flex-col items-center ">
            <label>Username</label>
            <input type="text" name="text" />
            <label>E-mail</label>
            <input type="email" name="email" />
            <label>Password</label>
            <input type="password" name="password" />
            <label>Confirm Password</label>
            <input type="password" name="confirm-password" />
          </form>
        </div>
      </div>
    </>
  );
}
