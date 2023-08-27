type UserData = {
    firstName: string
    lastName: string
    phoneNumber: string
  }
  
  type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
  }

const UserForm = ({
    firstName,
    lastName,
    phoneNumber,
    updateFields}: UserFormProps) => {
  return (
    <>
      <div>
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={e => updateFields({ firstName: e.target.value })}
          className="bg-gray-900 border border-gray-300 text-gray-200  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Tolga"
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => updateFields({ lastName: e.target.value })}
          className="bg-gray-900 border border-gray-300 text-gray-200  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Zorlu"
          required
        />
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
        >
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={e => updateFields({ phoneNumber: e.target.value })}
          className="bg-gray-900 border border-gray-300 text-gray-200  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="05555555555"
          required
        />
      </div>
    </>
  );
};

export default UserForm;
