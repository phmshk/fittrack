import { UpdateUserGoal } from "@/features/updateUserGoal";
import { UpdateActivityLevel } from "@/features/updateActivityLevel";
import { UpdatePersonalInfo } from "@/features/updatePersonalInfo";

export const PersonalInfoTab = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="col-span-1">
        <UpdatePersonalInfo />
      </div>
      <div className="col-span-1">
        <UpdateUserGoal />
      </div>
      <div className="col-span-1 md:col-span-2">
        <UpdateActivityLevel />
      </div>
    </div>
  );
};
