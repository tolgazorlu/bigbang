type ValidationData = {
    email: string
    password: string
    confirmPassword: string
  }
  
  type ValidationFormProps = ValidationData & {
    updateFields: (fields: Partial<ValidationData>) => void
  }

const ValidationForm = ({
    email,
    password,
    confirmPassword,
    updateFields}: ValidationFormProps) => {
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => updateFields({ email: e.target.value })}
          className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="my@mail.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => updateFields({ password: e.target.value })}
          className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="********"
          required
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => updateFields({ confirmPassword: e.target.value })}
          className="bg-slate-200 border border-gray-300 text-gray-700  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="********"
          required
        />
      </div>
    </>
  );
};

export default ValidationForm;
