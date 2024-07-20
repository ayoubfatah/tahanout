export default function Avatar({ fullName, role, avatar }: any) {
  return (
    <div className="flex items-center space-x-2 mr-2 ">
      <img
        src={avatar || `https://avatars.dicebear.com/api/initials/.svg`}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col text-start">
        <p className="text-[14px]  font-medium text-gray-700  dark:text-gray-100">
          {fullName}
        </p>
        <p
          className={`text-md ${
            role === "owner"
              ? "text-yellow-300  "
              : "text-gray-500 dark:text-gray-100"
          } `}
        >
          {role}{" "}
        </p>
      </div>
    </div>
  );
}
