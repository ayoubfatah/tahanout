import { useTranslation } from "react-i18next";
import SettingsForm from "../features/Settings/SettingsTable";

export default function Settings() {
  const { t } = useTranslation();
  console.log(t, "t");
  return (
    <div className=" flex flex-col gap-10 justify-center items-center ">
      <div className="text-[40px] font-bold  ">
        {t("update_tahanout_settings")}:{" "}
      </div>
      <SettingsForm />
    </div>
  );
}
