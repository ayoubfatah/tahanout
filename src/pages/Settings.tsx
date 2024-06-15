import SettingsForm from "../features/Settings/SettingsTable";

export default function Settings() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="text-[40px] font-bold  ">Update Tahanout's Settings</div>
      <SettingsForm />
    </div>
  );
}
